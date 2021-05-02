import _ from 'lodash';
import { LeanDocument, Model, model, models, Schema } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { IProductDocument, ProductSchema } from './product';

const PaymentStatusPossibilities = ['unpayed', 'payed', 'refunded'] as const;

export type IOrder = {
    products: Omit<
        LeanDocument<IProductDocument>,
        'archived' | 'isSpecialty' | 'minimumPrice' | 'image'
    >[];
    contactPhoneNumber: string;
    paymentStatus: typeof PaymentStatusPossibilities[number];
    paymentIntent?: string;
    completed: boolean;
};

export type IOrderDocument = IOrder & Document & DocumentTimestamps;

export type ISerializedOrder = Omit<LeanDocument<IOrderDocument>, '_id'> & {
    _id: string;
};

export const OrderSchema = new Schema(
    {
        products: [_.omit(ProductSchema, ['archived', 'isSpecialty', 'minimumPrice'])],
        contactPhoneNumber: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: PaymentStatusPossibilities,
            required: true,
        },
        paymentIntent: {
            type: String,
            required: false,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Order: Model<IOrderDocument> = models.Order ?? model('Order', OrderSchema, 'orders');
