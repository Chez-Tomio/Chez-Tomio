import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoryProps, CategoryTile } from './CategoryTile';

export default {
    title: 'Components/Menu/Categories/Category',
    component: CategoryTile,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<CategoryProps> = (args) => (
    <CategoryTile {...args}>Category</CategoryTile>
);
Template.args = {
    imageUrl: '/sample-image.jpg',
};
