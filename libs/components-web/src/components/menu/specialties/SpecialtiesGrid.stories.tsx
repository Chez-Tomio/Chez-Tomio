import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { SpecialtiesGrid } from './SpecialtiesGrid';
import { Specialty } from './Specialty';

export default {
    title: 'Components/Menu/Specialties/SpecialtiesGrid',
    component: SpecialtiesGrid,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story = (args) => (
    <SpecialtiesGrid {...args}>
        <Specialty name="Specialty" description="Description" imageUrl="/sample-image.jpg">
            Product
        </Specialty>
        <Specialty name="Specialty" description="Description" imageUrl="/sample-image.jpg">
            Product
        </Specialty>
        <Specialty name="Specialty" description="Description" imageUrl="/sample-image.jpg">
            Product
        </Specialty>
        <Specialty name="Specialty" description="Description" imageUrl="/sample-image.jpg">
            Product
        </Specialty>
        <Specialty name="Specialty" description="Description" imageUrl="/sample-image.jpg">
            Product
        </Specialty>
    </SpecialtiesGrid>
);
