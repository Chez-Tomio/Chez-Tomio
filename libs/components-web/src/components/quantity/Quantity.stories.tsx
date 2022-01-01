// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Quantity, QuantityProps } from './Quantity';

export default {
    title: 'Components/Quantity',
    component: Quantity,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<QuantityProps> = (args) => <Quantity {...args}></Quantity>;
Template.args = {
    getQuantity: (quantity: number) => {
        console.log(quantity);
    },
};
