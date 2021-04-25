// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Button, ButtonProps } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        size: {
            control: { type: 'select', options: ['small', 'medium', 'large'] },
        },
    },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

export const Primary = Template.bind({});
Primary.parameters = {
    backgrounds: { default: 'white' },
};
Primary.args = {
    primary: true,
};

export const Secondary = Template.bind({});
Secondary.args = {};

export const Large = Template.bind({});
Large.args = {
    size: 'large',
};

export const Small = Template.bind({});
Small.args = {
    size: 'small',
};
