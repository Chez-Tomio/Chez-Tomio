import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Nav, NavProps } from './Nav';
import { NavItem } from './NavItem';

export default {
    title: 'Components/Nav/Nav',
    component: Nav,
} as Meta;

const Template: Story<NavProps> = (args) => (
    <Nav {...args}>
        <NavItem href="">Home</NavItem>
        <NavItem href="">Page 1</NavItem>
        <NavItem href="">Page 2</NavItem>
        <NavItem href="">Page 3</NavItem>
        <NavItem href="">Page 4</NavItem>
        <NavItem href="">Page 5</NavItem>
    </Nav>
);

export const Normal = Template.bind({});
Normal.args = {};

export const Stacked = Template.bind({});
Stacked.args = {
    stacked: true,
};
