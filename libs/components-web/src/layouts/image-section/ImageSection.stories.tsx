import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { ImageSection, ImageSectionProps } from './ImageSection';

export default {
    title: 'Layouts/ImageSection',
    component: ImageSection,
    parameters: {
        backgrounds: { default: 'white' },
    },
    argTypes: {
        size: {
            control: { type: 'select', options: ['normal', 'half', 'fill'] },
        },
    },
} as Meta;

export const Template: Story<ImageSectionProps> = (args) => (
    <ImageSection {...args}>
        <h2>Image Section</h2>
        <p>Description</p>
    </ImageSection>
);
Template.args = {
    imageUrl: '/sample-image.jpg',
};
