import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Footer, FooterProps } from './Footer';

export default {
    title: 'Layouts/Footer',
    component: Footer,
    parameters: {
        backgrounds: { default: 'white' },
    },
} as Meta;

export const Template: Story<FooterProps> = (args) => <Footer {...args} />;
Template.args = {
    leftText: 'Copyright © 2021 Chez Tomio',
    rightText: 'Tous droits réservés.',
};
