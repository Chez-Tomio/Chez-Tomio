import Stripe from 'stripe';

import { apiEvents } from '../../../lib/api/events';
import { apiEndpointWrapper, getRawBody, sendError } from '../../../lib/api/utils';
import { Order } from '../../../lib/database/mongo';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2020-08-27',
});

export default apiEndpointWrapper(async (req, res) => {
    if (req.method !== 'POST') return sendError(res, 405);

    const payload = await getRawBody(req);
    const sig = req.headers['stripe-signature'];

    if (!sig || !payload) return sendError(res, 401);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_ENDPOINT_SECRET);
    } catch (e) {
        return sendError(res, 403);
    }

    switch (event.type) {
        case 'checkout.session.completed': {
            const {
                metadata: { orderId },
                payment_intent,
            } = event.data.object as any;

            const order = await Order.findById(orderId);
            if (!order) throw `order #${orderId} not found`;

            order.paymentStatus = 'payed';
            order.paymentIntent = payment_intent;
            await order.save();

            apiEvents.emit('newOrder', orderId);

            break;
        }
        case 'charge.refunded': {
            const paymentIntentsToRefund = (event.data.object as any).refunds.data.map(
                (r: any) => r.payment_intent,
            ) as string[];

            for (const paymentIntent of paymentIntentsToRefund) {
                const order = await Order.findOne({ paymentIntent });
                if (!order) throw `order with paymentIntent ${paymentIntent} not found`;
                order.paymentStatus = 'refunded';
                await order.save();
            }

            break;
        }
    }

    return res.status(200).send({});
});

export const config = {
    api: {
        bodyParser: false,
    },
};
