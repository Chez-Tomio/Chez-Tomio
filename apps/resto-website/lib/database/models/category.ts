import { LeanDocument, Model, model, models, Schema, Types } from 'mongoose';
import slug from 'slug';

import { ILocalizedString, LocalizedStringSchema } from '../utils';
import { Document, DocumentTimestamps } from '../utils';
import { ISerializedProduct, Product } from './product';
export type ICategory = {
    image: string;
    title: ILocalizedString;
    slug: string;
    products: Types.ObjectId[];
    archived: boolean;
};

export type ICategoryDocument = ICategory & Document & DocumentTimestamps;

export type ISerializedCategory = Omit<LeanDocument<ICategoryDocument>, '_id' | 'products'> & {
    _id: string;
};

export type ISerializedCategoryWithProducts = ISerializedCategory & {
    products: ISerializedProduct[];
};

export const CategorySchema = new Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: LocalizedStringSchema(true),
        slug: {
            type: String,
            unique: true,
            default() {
                const category = this as Omit<ICategory, 'slug'>;
                return slug(category.title.fr);
            },
        },
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
