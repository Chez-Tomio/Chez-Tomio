import { Document, Model, model, models, Schema } from 'mongoose';

import { ILocalizedString, LocalizedStringSchema } from '../utils';
import { DocumentTimestamps } from '../utils';
import { Product } from './product';

export type ICategory = {
    image: Buffer;
    title: ILocalizedString;
    products: Document['_id'][];
    archived: boolean;
} & DocumentTimestamps;

export const CategorySchema = new Schema(
    {
        image: Buffer,
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

export const Category: Model<ICategory & Document> =
    models.Category ?? model('Category', CategorySchema, 'categories');
