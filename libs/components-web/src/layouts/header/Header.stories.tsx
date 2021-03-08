import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Header, HeaderSpace } from './Header';

export default {
    title: 'Layouts/Header',
    component: Header,
} as Meta;

export const Template: Story = (args) => (
    <Header {...args}>
        Left
        <HeaderSpace />
        Right
    </Header>
);
