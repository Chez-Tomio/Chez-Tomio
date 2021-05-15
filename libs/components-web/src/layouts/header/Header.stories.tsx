import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Header, HeaderSpace } from './Header';

export default {
    title: 'Layouts/Header',
    component: Header,
} as Meta;

export const WhiteBackground: Story = (args) => (
    <Header {...args}>
        Left
        <HeaderSpace />
        Right
    </Header>
);
WhiteBackground.parameters = {
    backgrounds: { default: 'white' },
};
WhiteBackground.args = {
    backgroundFull: true,
};

export const BlackBackground: Story = (args) => (
    <Header {...args}>
        Left
        <HeaderSpace />
        Right
    </Header>
);
BlackBackground.parameters = {
    backgrounds: { default: 'black' },
};
BlackBackground.args = {
    backgroundFull: false,
};
