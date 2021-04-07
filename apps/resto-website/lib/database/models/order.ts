import _ from 'lodash';
import { Model, model, models, Schema, Types } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { IProduct, ProductSchema } from './product';
import { User } from './user';

const PaymentStatusPossibilities = ['unpayed', 'payed', 'refunded'] as const;

export type IOrder = {
    _id?: Types.ObjectId;
    products: (Omit<IProduct, 'archived' | 'isSpecialty' | 'minimumPrice' | 'image'> & {
        id: string;
    })[];
    contactPhoneNumber: string;
    user?: Types.ObjectId;
    paymentStatus: typeof PaymentStatusPossibilities[number];
};

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
