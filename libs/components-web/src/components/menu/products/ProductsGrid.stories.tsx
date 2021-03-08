import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Product } from './Product';
import { ProductsGrid } from './ProductsGrid';

export default {
    title: 'Components/Menu/Products/ProductsGrid',
    component: ProductsGrid,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <ProductsGrid {...args}>
        <Product imageUrl="/sample-image.jpg">Product</Product>
        <Product imageUrl="/sample-image.jpg">Product</Product>
        <Product imageUrl="/sample-image.jpg">Product</Product>
        <Product imageUrl="/sample-image.jpg">Product</Product>
        <Product imageUrl="/sample-image.jpg">Product</Product>
        <Product imageUrl="/sample-image.jpg">Product</Product>
    </ProductsGrid>
);
