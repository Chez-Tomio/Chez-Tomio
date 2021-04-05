import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';

import { ILocalizedString, IntegerSchema, LocalizedStringSchema } from '../utils';

interface IBought {
    title: ILocalizedString;
    price: number;
}

export type IOrder = {} & Document;

const OrderSchema = new Schema({}, { timestamps: true });

export const Order: Model<IOrder> = models.Order ?? model('Order', OrderSchema);
