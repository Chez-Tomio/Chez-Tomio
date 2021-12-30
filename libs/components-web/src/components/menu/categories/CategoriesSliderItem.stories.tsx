import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { CategoriesSliderItem, CategoriesSliderItemProps } from './CategoriesSliderItem';

export default {
    title: 'Components/Menu/Categories/CategoriesSliderItem',
    component: CategoriesSliderItem,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<CategoriesSliderItemProps> = (args) => (
    <CategoriesSliderItem {...args}>Category</CategoriesSliderItem>
);
