import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';

import { DocumentTimestamps } from '../utils';
import { IProduct, ProductSchema } from './product';
import { User } from './user';

export type IOrder = {
    products: Omit<IProduct, 'archived' | 'isSpecialty' | 'minimumPrice'>[];
    contactPhoneNumber: string;
    user?: Document['_id'];
} & DocumentTimestamps;

export const OrderSchema = new Schema(
    {
        products: [_.omit(ProductSchema, ['archived', 'isSpecialty', 'minimumPrice'])],
        contactPhoneNumber: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Type.ObjectId,
            ref: User.modelName,
        },
    },
    { timestamps: true },
);

export const Order: Model<IOrder & Document> =
    models.Order ?? model('Order', OrderSchema, 'orders');
