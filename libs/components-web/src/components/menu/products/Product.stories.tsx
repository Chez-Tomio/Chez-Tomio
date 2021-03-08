import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Product, ProductProps } from './Product';

export default {
    title: 'Components/Menu/Products/Product',
    component: Product,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<ProductProps> = (args) => <Product {...args}>Product</Product>;
Template.args = {
    imageUrl: '/sample-image.jpg',
};
