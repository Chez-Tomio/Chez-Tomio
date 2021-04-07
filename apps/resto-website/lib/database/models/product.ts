import _ from 'lodash';
import { Model, model, models, Schema, Types } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { ILocalizedString, LocalizedStringSchema } from '../utils';

interface IBuyable {
    _id?: Types.ObjectId;
    title: ILocalizedString;
    description: Partial<ILocalizedString>;
    price: number;
}

export type IProduct = Omit<IBuyable, 'price'> & {
    basePrice: number;
    isSpecialty: boolean;
    image?: string;
    archived: boolean;
    extras: IBuyable[];
};

export type IProductDocument = IProduct & Document & DocumentTimestamps;

const BuyablePartialSchema = {
    title: LocalizedStringSchema(true),
    description: LocalizedStringSchema(false),
    price: {
        type: Number,
        required: true,
    },
};

export const ProductSchema = new Schema(
    {
        ..._.omit(BuyablePartialSchema, ['price']),
        basePrice: {
            type: Number,
            required: true,
        },
        isSpeciality: {
            type: Boolean,
            default: false,
        },
        extras: [{ ...BuyablePartialSchema }],
        archived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Product: Model<IProductDocument> =
    models.Product ?? model('Product', ProductSchema, 'products');
