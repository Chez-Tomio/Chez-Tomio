import { ProductDTOWithMetadata } from '../api/dto/checkout';

/**
 * Calculates the total price of a product
 * @param product
 * @returns {number}
 */
export const getTotalProductPrice = (product: ProductDTOWithMetadata) =>
    product.count *
    (product.basePrice + product.extras.reduce((acc, curr) => acc + curr.price * curr.count, 0));

/**
 * Converts a number into a price
 */
export const toPrice = (price: number) => `$${price.toFixed(2)}`;
