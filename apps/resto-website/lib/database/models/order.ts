import _ from 'lodash';
import { LeanDocument, Model, model, models, Schema } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { IProductDocument, ProductSchema } from './product';

/**
 * Payment status possible values
 */
const PaymentStatusPossibilities = ['unpayed', 'payed', 'refunded'] as const;

/**
 * Order types
 */
type IOrder = {
    products: Omit<
        LeanDocument<IProductDocument>,
        'archived' | 'isSpecialty' | 'minimumPrice' | 'image'
    >[];
    contactPhoneNumber: string;
    paymentStatus: typeof PaymentStatusPossibilities[number];
    paymentIntent?: string;
    completed: boolean;
};
type IOrderDocument = IOrder & Document & DocumentTimestamps;
type ISerializedOrder = Omit<LeanDocument<IOrderDocument>, '_id'> & {
    _id: string;
};
export type { IOrder, IOrderDocument, ISerializedOrder };

/**
 * Order schema
 */
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

/**
 * Order model
 */
export const Order: Model<IOrderDocument> = models.Order ?? model('Order', OrderSchema, 'orders');
