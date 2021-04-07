import { LeanDocument, Model, model, models, Schema, Types } from 'mongoose';

import { ILocalizedString, LocalizedStringSchema } from '../utils';
import { Document, DocumentTimestamps } from '../utils';
import { ISerializedProduct, Product } from './product';

export type ICategory = {
    image: string;
    title: ILocalizedString;
    products: Types.ObjectId[];
    archived: boolean;
};

export type ICategoryDocument = ICategory & Document & DocumentTimestamps;

export type ISerializedCategoryWithProducts = Omit<
    LeanDocument<ICategoryDocument>,
    '_id' | 'products'
> & {
    _id: string;
    products: ISerializedProduct[];
};

export const CategorySchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: LocalizedStringSchema(true),
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: Product.modelName,
            },
        ],
        archived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

export const Category: Model<ICategoryDocument> =
    models.Category ?? model('Category', CategorySchema, 'categories');
