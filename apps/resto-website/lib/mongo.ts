import { Schema, model, connect, connection, Document } from 'mongoose';
import * as uuid from 'uuid';
import _ from 'lodash';

export async function connectToDatabase() {
    if ([0, 3].includes(connection.readyState))
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
}

const BuyableSchema = {
    image: {
        type: Buffer,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
};

const ProductSchema = new Schema();

// const ProductSchema = new Schema(
//     {
//         addons: [
//             {
//                 image: {
//                     type: Buffer,
//                 },
//                 title: {
//                     type: String,
//                     required: true,
//                 },
//                 description: {
//                     type: String,
//                 },
//                 price: {
//                     type: Number,
//                     required: true,
//                 },
//             },
//         ],
//         configurations: [
//             {
//                 title: {
//                     type: String,
//                     required: true,
//                     immutable: true,
//                 },
//                 amount: {
//                     type: Number,
//                     required: true,
//                     validate: {
//                         validator: Number.isInteger,
//                         message: '{VALUE} is not an integer value',
//                     },
//                 },
//                 possibilities: [
//                     {
//                         image: {
//                             type: Buffer,
//                         },
//                         title: {
//                             type: String,
//                             required: true,
//                         },
//                         description: {
//                             type: String,
//                         },
//                         price: {
//                             type: Number,
//                             required: true,
//                         },
//                     },
//                 ],
//             },
//         ],
//     },
//     { timestamps: true },
// );

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

interface IBuyable {
    image: Buffer;
    title: string;
    description: string;
    price: number;
}

type IProduct = Omit<IBuyable, 'price'> & {
    isSpecialty: boolean;
    basePrice: number;
    minimumPrice: number;
    extras: IBuyable[];
    customizationCategories: {
        title: string;
        minimumChoicesAmount: number;
        choices: IBuyable[];
    }[];
} & Document;

export const Product = model<IProduct>('Product', ProductSchema);
