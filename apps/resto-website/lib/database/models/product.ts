import _ from 'lodash';
import { LeanDocument, Model, model, models, Schema, Types } from 'mongoose';

import { Document, DocumentTimestamps } from '../utils';
import { ILocalizedString, LocalizedStringSchema } from '../utils';

interface IBuyable {
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

export type IProductDocument = Omit<IProduct, 'extras'> & {
    extras: (IBuyable & { _id: Types.ObjectId })[];
} & Document &
    DocumentTimestamps;

export type ISerializedProduct = Omit<LeanDocument<IProductDocument>, '_id' | 'extras'> & {
    _id: string;
    extras: (IBuyable & { _id: string })[];
};

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
        image: String,
        ..._.omit(BuyablePartialSchema, ['price']),
        basePrice: {
            type: Number,
            required: true,
        },
        isSpecialty: {
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
