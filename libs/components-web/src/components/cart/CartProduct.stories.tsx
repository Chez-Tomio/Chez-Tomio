import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CartProduct, CartProductProps } from './CartProduct';

export default {
    title: 'Components/Cart/CartProduct',
    component: CartProduct,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<CartProductProps> = (args) => <CartProduct {...args}></CartProduct>;
Template.args = {
    title: "Product's title",
    image: 'sample-image.jpg',
    quantity: 2,
    price: '$5.20',
    extras: 'Extra x 2.00',
    remove: () => console.log('Product removed'),
};
