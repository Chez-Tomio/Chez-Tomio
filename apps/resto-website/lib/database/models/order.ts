import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';
import { PartialDeep } from 'type-fest';

import { DocumentTimestamps } from '../utils';
import { IProduct, ProductSchema } from './product';
import { IUserDocument, User } from './user';

const PaymentStatusPossibilities = ['unpayed', 'payed', 'refunded'] as const;

export type IOrder = PartialDeep<{
    products: Omit<IProduct, 'archived' | 'isSpecialty' | 'minimumPrice'>[];
    contactPhoneNumber: string;
    user: IUserDocument['_id'];
    paymentStatus: typeof PaymentStatusPossibilities[number];
}>;

export type IOrderDocument = IOrder & Document & DocumentTimestamps;

export const OrderSchema = new Schema(
    {
        products: [_.omit(ProductSchema, ['archived', 'isSpecialty', 'minimumPrice'])],
        contactPhoneNumber: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: User.modelName,
        },
        paymentStatus: {
            type: String,
            enum: PaymentStatusPossibilities,
            required: true,
        },
    },
    { timestamps: true },
);

export const Order: Model<IOrderDocument> = models.Order ?? model('Order', OrderSchema, 'orders');
