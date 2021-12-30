import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoriesSlider } from './CategoriesSlider';
import { CategoriesSliderItem } from './CategoriesSliderItem';

export default {
    title: 'Components/Menu/Categories/CategoriesSlider',
    component: CategoriesSlider,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <CategoriesSlider {...args}>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
        <CategoriesSliderItem>Category</CategoriesSliderItem>
    </CategoriesSlider>
);
