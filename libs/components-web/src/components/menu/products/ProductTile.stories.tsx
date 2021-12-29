import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ProductTileProps, ProductTile } from './ProductTile';

export default {
    title: 'Components/Menu/Products/Product',
    component: ProductTile,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<ProductTileProps> = (args) => (
    <>
        <div style={{ height: 20 }}></div>
        <ProductTile {...args}>Product</ProductTile>
    </>
);
Template.args = {
    imageUrl: '/sample-image.jpg',
    title: 'Title',
    description: 'Description',
    price: 2.35,
    onClickAdd: () => {
        console.log('Added product');
    },
};
