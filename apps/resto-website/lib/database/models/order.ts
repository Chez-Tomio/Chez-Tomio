import _ from 'lodash';
import { LeanDocument, Model, model, models, Schema, Types } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { IProductDocument, ProductSchema } from './product';
import { ISerializedUser, User } from './user';

const PaymentStatusPossibilities = ['unpayed', 'payed', 'refunded'] as const;

export type IOrder = {
    products: Omit<
        LeanDocument<IProductDocument>,
        'archived' | 'isSpecialty' | 'minimumPrice' | 'image'
    >[];
    contactPhoneNumber: string;
    user?: Types.ObjectId;
    paymentStatus: typeof PaymentStatusPossibilities[number];
    completed: boolean;
};

export type IOrderDocument = IOrder & Document & DocumentTimestamps;

export type ISerializedOrderWithUser = Omit<LeanDocument<IOrderDocument>, '_id' | 'user'> & {
    _id: string;
    user?: ISerializedUser;
};

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
        completed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Order: Model<IOrderDocument> = models.Order ?? model('Order', OrderSchema, 'orders');
