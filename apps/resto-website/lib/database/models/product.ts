import _ from 'lodash';
import { LeanDocument, Model, model, models, Schema, Types } from 'mongoose';
import slug from 'slug';

import { Document, DocumentTimestamps } from '../utils';
import { ILocalizedString, LocalizedStringSchema } from '../utils';

/**
 * Buyable interface
 */
interface IBuyable {
    title: ILocalizedString;
    description: Partial<ILocalizedString>;
    price: number;
}

/**
 * Buyable schema
 */
const BuyablePartialSchema = {
    title: LocalizedStringSchema(true),
    description: LocalizedStringSchema(false),
    price: {
        type: Number,
        required: true,
    },
};

/**
 * Product types
 */
type IProduct = Omit<IBuyable, 'price'> & {
    basePrice: number;
    slug: string;
    isSpecialty: boolean;
    image?: string;
    archived: boolean;
    extras: IBuyable[];
};
type IProductDocument = Omit<IProduct, 'extras'> & {
    extras: (IBuyable & { _id: Types.ObjectId })[];
} & Document &
    DocumentTimestamps;
type ISerializedProduct = Omit<LeanDocument<IProductDocument>, '_id' | 'extras'> & {
    _id: string;
    extras: (IBuyable & { _id: string })[];
};
export type { IProduct, IProductDocument, ISerializedProduct };

/**
 * Product schema
 */
export const ProductSchema = new Schema(
    {
        image: String,
        ..._.omit(BuyablePartialSchema, ['price']),
        basePrice: {
            type: Number,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            default() {
                const product = this as Omit<IProduct, 'slug'>;
                return slug(product.title.fr);
            },
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

/**
 * Product model
 */
export const Product: Model<IProductDocument> =
    models.Product ?? model('Product', ProductSchema, 'products');
