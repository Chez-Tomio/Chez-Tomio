import _ from 'lodash';
import { Document, Model, model, models, Schema } from 'mongoose';
import { PartialDeep } from 'type-fest';

import { DocumentTimestamps } from '../utils';
import { ILocalizedString, IntegerSchema, LocalizedStringSchema } from '../utils';

interface IBuyable {
    image: string;
    title: ILocalizedString;
    description: Partial<ILocalizedString>;
    price: number;
}

export type IProduct = PartialDeep<
    Omit<IBuyable, 'price'> & {
        basePrice: number;
        minimumPrice: number;
        isSpecialty: boolean;
        extras: (IBuyable & Document)[];
        customizationCategories: {
            title: ILocalizedString;
            minimumChoicesAmount: number;
            choices: (IBuyable & Document)[];
        }[];
        archived: boolean;
    }
>;

export type IProductDocument = IProduct & Document & DocumentTimestamps;

const BuyablePartialSchema = {
    image: String,
    title: LocalizedStringSchema(true),
    description: LocalizedStringSchema(false),
    price: {
        type: Number,
        required: true,
    },
};

const ExtraSchema = new Schema({ ...BuyablePartialSchema });
const CustomizationChoiceSchema = new Schema({ ...BuyablePartialSchema });

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
        extras: [ExtraSchema],
        customizationCategories: {
            title: LocalizedStringSchema(true),
            minimumChoicesAmount: IntegerSchema,
            choices: [CustomizationChoiceSchema],
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
        (product.basePrice ?? 0) +
        _.sumBy(product.customizationCategories, (configuration) =>
            _.chain(configuration!.choices)
                .map('price')
                .sort()
                .take(configuration!.minimumChoicesAmount)
                .sum()
                .value(),
        )
    );
});

export const Product: Model<IProductDocument> =
    models.Product ?? model('Product', ProductSchema, 'products');
