import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoryTile, CategoryTileProps } from './CategoryTile';

export default {
    title: 'Components/Menu/Categories/CategoryTile',
    component: CategoryTile,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<CategoryTileProps> = (args) => (
    <CategoryTile {...args}>Category</CategoryTile>
);
Template.args = {
    imageUrl: '/sample-image.jpg',
};
