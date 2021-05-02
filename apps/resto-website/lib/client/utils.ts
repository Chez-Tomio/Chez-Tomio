import { ProductDTOWithMetadata } from '../api/dto/checkout';

export const getTotalProductPrice = (product: ProductDTOWithMetadata) =>
    product.count *
    (product.basePrice + product.extras.reduce((acc, curr) => acc + curr.price * curr.count, 0));
