import { Document, Model, model, models, Schema } from 'mongoose';

import { ILocalizedString, LocalizedStringSchema } from '../utils';
import { IProduct, Product } from './product';

export type ICategory = {
    image: Buffer;
    title: ILocalizedString;
    products: IProduct['_id'][];
} & Document;

const CategorySchema = new Schema(
    {
        image: Buffer,
        title: LocalizedStringSchema(true),
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: Product.modelName,
            },
        ],
    },
    { timestamps: true },
);

export const Category: Model<ICategory> = models.Category ?? model('Category', CategorySchema);
