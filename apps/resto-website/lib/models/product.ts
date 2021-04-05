import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';

import { DocumentTimestamps } from '../utils';
import { ILocalizedString, IntegerSchema, LocalizedStringSchema } from '../utils';

interface IBuyable {
    image: Buffer;
    title: ILocalizedString;
    description: Partial<ILocalizedString>;
    price: number;
}

export type IProduct = Omit<IBuyable, 'price'> & {
    basePrice: number;
    minimumPrice: number;
    isSpecialty: boolean;
    extras: IBuyable[];
    customizationCategories: {
        title: ILocalizedString;
        minimumChoicesAmount: number;
        choices: IBuyable[];
    }[];
    archived: boolean;
} & DocumentTimestamps;

const BuyableSchema = {
    image: Buffer,
    title: LocalizedStringSchema(true),
    description: LocalizedStringSchema(false),
    price: {
        type: Number,
        required: true,
    },
};

export const ProductSchema = new Schema(
    {
        ..._.omit(BuyableSchema, ['price']),
        basePrice: {
            type: Number,
            required: true,
        },
        isSpeciality: {
            type: Boolean,
            default: false,
        },
        extras: [BuyableSchema],
        customizationCategories: {
            title: LocalizedStringSchema(true),
            minimumChoicesAmount: IntegerSchema,
            choices: [BuyableSchema],
        },
        archived: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

ProductSchema.virtual('minimumPrice').get(function () {
    const product = this as Omit<IProduct, 'minimumPrice'>;
    return (
        product.basePrice +
        _.sumBy(product.customizationCategories, (configuration) =>
            _.chain(configuration.choices)
                .map('price')
                .sort()
                .take(configuration.minimumChoicesAmount)
                .sum()
                .value(),
        )
    );
});

export const Product: Model<IProduct & Document> =
    models.Product ?? model('Product', ProductSchema, 'products');
