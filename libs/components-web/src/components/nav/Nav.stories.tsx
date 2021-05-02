import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Nav, NavProps } from './Nav';
import { NavItem } from './NavItem';
import { NavWrapper } from './NavWrapper';

export default {
    title: 'Components/Nav/Nav',
    component: Nav,
} as Meta;

const Template: Story<NavProps> = (args) => (
    <NavWrapper>
        <Nav {...args}>
            <NavItem>Home</NavItem>
            <NavItem>Page 1</NavItem>
            <NavItem>Page 2</NavItem>
            <NavItem>Page 3</NavItem>
            <NavItem>Page 4</NavItem>
            <NavItem>
                <div>Page 5</div>
            </NavItem>
        </Nav>
    </NavWrapper>
);

export const Normal = Template.bind({});
Normal.args = {};

export const Stacked = Template.bind({});
Stacked.args = {
    stacked: true,
};
