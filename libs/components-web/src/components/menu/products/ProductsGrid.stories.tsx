import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ProductsGrid } from './ProductsGrid';
import { ProductTile } from './ProductTile';

export default {
    title: 'Components/Menu/Products/ProductsGrid',
    component: ProductsGrid,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <ProductsGrid {...args}>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
        <ProductTile imageUrl="/sample-image.jpg" onClickAdd={() => console.log('Ok')}>
            Product
        </ProductTile>
    </ProductsGrid>
);
