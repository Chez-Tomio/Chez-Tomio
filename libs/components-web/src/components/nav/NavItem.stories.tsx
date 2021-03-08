import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { NavItem, NavItemProps } from './NavItem';

export default {
    title: 'Components/Nav/NavItem',
    component: NavItem,
} as Meta;

export const Template: Story<NavItemProps> = (args) => <NavItem {...args}>NavItem</NavItem>;
Template.args = {
    href: '',
};
