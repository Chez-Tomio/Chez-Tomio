import { Model, model, models, Schema, Types } from 'mongoose';
import { PartialDeep } from 'type-fest';

import { ILocalizedString, LocalizedStringSchema } from '../utils';
import { Document, DocumentTimestamps } from '../utils';
import { Product } from './product';

export type ICategory = PartialDeep<{
    _id?: Types.ObjectId;
    image: string;
    title: ILocalizedString;
    products: Types.ObjectId[];
    archived: boolean;
}>;

export type ICategoryDocument = ICategory & Document & DocumentTimestamps;

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
