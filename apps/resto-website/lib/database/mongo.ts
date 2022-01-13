import { connect, connection } from 'mongoose';

/**
 * Connect to the mongoDB database
 */
export async function connectToDatabase() {
    if ([0, 3].includes(connection.readyState))
        await connect(process.env.MONGO_URI ?? '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
}

/**
 * Exports
 */

// category.ts
export type {
    ICategory,
    ICategoryDocument,
    ISerializedCategory,
    ISerializedCategoryWithProducts,
} from './models/category';
export { Category } from './models/category';

// order.ts
export type { IOrder, IOrderDocument, ISerializedOrder } from './models/order';
export { Order } from './models/order';

// product.ts
export type { IProduct, IProductDocument, ISerializedProduct } from './models/product';
export { Product } from './models/product';
