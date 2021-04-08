import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ProductProps, ProductTile } from './ProductTile';

export default {
    title: 'Components/Menu/Products/Product',
    component: ProductTile,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<ProductProps> = (args) => <ProductTile {...args}>Product</ProductTile>;
Template.args = {
    imageUrl: '/sample-image.jpg',
};
