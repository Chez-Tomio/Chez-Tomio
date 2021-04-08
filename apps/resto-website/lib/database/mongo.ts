import { connect, connection } from 'mongoose';

export async function connectToDatabase() {
    if ([0, 3].includes(connection.readyState))
        await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
}

export type {
    ICategory,
    ICategoryDocument,
    ISerializedCategory,
    ISerializedCategoryWithProducts,
} from './models/category';
export { Category } from './models/category';
export type { IOrder, IOrderDocument, ISerializedOrderWithUser } from './models/order';
export { Order } from './models/order';
export type { IProduct, IProductDocument, ISerializedProduct } from './models/product';
export { Product } from './models/product';
export type { ISerializedUser, IUser, IUserDocument } from './models/user';
export { User } from './models/user';
