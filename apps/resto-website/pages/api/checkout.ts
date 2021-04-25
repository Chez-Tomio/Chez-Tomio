import 'reflect-metadata';

import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import _ from 'lodash';
import Stripe from 'stripe';

import { CheckoutDTO } from '../../lib/api/dto/checkout';
import { apiEvents } from '../../lib/api/events';
import { apiEndpointWrapper, areValidationErrors, getUser, sendError } from '../../lib/api/utils';
import { Category, IOrder, Order, Product } from '../../lib/database/mongo';
import { localizedStringToString } from '../../lib/database/utils';
import { Unboxed } from '../../lib/types/utils';
import { emptyStringToUndefined } from '../../lib/utils';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2020-08-27',
});

export default apiEndpointWrapper(async (req, res) => {
    if (req.method !== 'POST') return sendError(res, 405);

    const checkoutDTO = plainToClass(CheckoutDTO, req.body, { excludeExtraneousValues: true });

    try {
        await validateOrReject(checkoutDTO);
    } catch (e) {
        if (areValidationErrors(e)) return sendError(res, 400);
        else throw e;
    }

    const user = await getUser(req);

    const order = new Order(<IOrder>{
        contactPhoneNumber: checkoutDTO.contactPhoneNumber,
        user: user?._id,
        paymentStatus: 'unpayed',
        products: [],
    });

    for (const productDTO of checkoutDTO.products) {
        const product = await Product.findOne({ _id: productDTO.id, archived: false }).lean();
        const category = await Category.findOne({
            products: product?._id,
            archived: false,
        });

        if (!product || !category) return sendError(res, 404);

        const orderProduct = _.chain(product)
            .omit('_id', '__v', 'createdAt', 'updatedAt', 'archived', 'isSpecialty', 'minimumPrice')
            .set('extras', [])
            .value() as Unboxed<IOrder['products']>;

        for (const extraDTO of productDTO.extras) {
            const extra = product.extras.find((e) => {
                return e._id.toString() === extraDTO.id;
            });

            if (!extra) return sendError(res, 404);

            _.times(extraDTO.count, () => orderProduct.extras.push(_.cloneDeep(extra)));
        }

        _.times(productDTO.count, () => order.products.push(_.cloneDeep(orderProduct)));
    }

    await order.save();

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: _.flatten(
            order.products.map(
                (p) =>
                    <Stripe.Checkout.SessionCreateParams.LineItem[]>[
                        {
                            name: localizedStringToString(p.title),
                            description: emptyStringToUndefined(
                                localizedStringToString(p.description),
                            ),
                            currency: 'CAD',
                            amount: p.basePrice * 100,
                            quantity: 1,
                        },
                        ...p.extras.map(
                            (e) =>
                                <Stripe.Checkout.SessionCreateParams.LineItem>{
                                    name: `Extra - ${localizedStringToString(e.title)}`,
                                    description: emptyStringToUndefined(
                                        localizedStringToString(p.description),
                                    ),
                                    currency: 'CAD',
                                    amount: p.basePrice * 100,
                                    quantity: 1,
                                },
                        ),
                    ],
            ),
        ),
        mode: 'payment',
        success_url: `${process.env.SITE_BASE_URL}/success`,
        cancel_url: `${process.env.SITE_BASE_URL}/cancel`,
        customer_email: user?.email,
        metadata: {
            orderId: order._id.toString(),
        },
    });

    apiEvents.emit('newOrder', order._id.toString());
    console.log('MUST BE REMOVED');

    return res.json({ sessionId: session.id });
});
