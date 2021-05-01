import { ProductDTOWithMetadata } from '../api/dto/checkout';

export const getTotalProductPrice = (product: ProductDTOWithMetadata) =>
    product.basePrice * product.count +
    product.extras.reduce((acc, curr) => acc + curr.price * curr.count, 0);
