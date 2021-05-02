import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoriesGrid } from './CategoriesGrid';
import { CategoryTile } from './CategoryTile';

export default {
    title: 'Components/Menu/Categories/CategoriesGrid',
    component: CategoriesGrid,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <CategoriesGrid {...args}>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
        <CategoryTile imageUrl="/sample-image.jpg">Category</CategoryTile>
    </CategoriesGrid>
);
