import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoriesGrid } from './CategoriesGrid';
import { Category } from './Category';

export default {
    title: 'Components/Menu/Categories/CategoriesGrid',
    component: CategoriesGrid,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <CategoriesGrid {...args}>
        <Category imageUrl="/sample-image.jpg">Category</Category>
        <Category imageUrl="/sample-image.jpg">Category</Category>
        <Category imageUrl="/sample-image.jpg">Category</Category>
        <Category imageUrl="/sample-image.jpg">Category</Category>
        <Category imageUrl="/sample-image.jpg">Category</Category>
        <Category imageUrl="/sample-image.jpg">Category</Category>
    </CategoriesGrid>
);
