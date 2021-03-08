import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Category, CategoryProps } from './Category';

export default {
    title: 'Components/Menu/Categories/Category',
    component: Category,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<CategoryProps> = (args) => <Category {...args}>Category</Category>;
Template.args = {
    imageUrl: '/sample-image.jpg',
};
