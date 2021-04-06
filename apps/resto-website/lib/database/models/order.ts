import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';
import { PartialDeep } from 'type-fest';

import { DocumentTimestamps } from '../utils';
import { IProduct, ProductSchema } from './product';
import { User } from './user';

export type IOrder = PartialDeep<{
    products: Omit<IProduct, 'archived' | 'isSpecialty' | 'minimumPrice'>[];
    contactPhoneNumber: string;
    user: Document['_id'];
}>;

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
    },
    { timestamps: true },
);

export const Order: Model<IOrder & Document & DocumentTimestamps> =
    models.Order ?? model('Order', OrderSchema, 'orders');
