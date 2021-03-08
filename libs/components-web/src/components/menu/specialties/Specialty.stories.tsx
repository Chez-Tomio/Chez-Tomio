import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Specialty, SpecialtyProps } from './Specialty';

export default {
    title: 'Components/Menu/Specialties/Specialty',
    component: Specialty,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<SpecialtyProps> = (args) => <Specialty {...args} />;
Template.args = {
    imageUrl: '/sample-image.jpg',
    name: 'Specialty',
    description: 'Description',
};
