import { css } from '@emotion/react';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { NavCartButton, NavCartButtonProps } from './NavCartButton';

export default {
    title: 'Components/Cart/NavCartButton',
    component: NavCartButton,
} as Meta;

export const Template: Story<NavCartButtonProps> = (args) => (
    <NavCartButton {...args}></NavCartButton>
);
Template.args = {
    cartItemCount: 2,
};
