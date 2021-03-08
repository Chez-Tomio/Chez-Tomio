import { addDecorator } from '@storybook/react';
import { GlobalStyles } from '../src';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'fullscreen',
    backgrounds: {
        default: 'black',
        values: [
            {
                name: 'black',
                value: '#000',
            },
            {
                name: 'white',
                value: '#fff',
            },
        ],
    },
};

addDecorator((story) => (
    <>
        <GlobalStyles />
        <div style={{ minHeight: '100vh', height: '100%' }}>{story()}</div>
    </>
));
