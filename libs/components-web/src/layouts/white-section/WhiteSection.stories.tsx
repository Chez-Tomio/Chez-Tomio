import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { WhiteSection } from './WhiteSection';

export default {
    title: 'Layouts/WhiteSection',
    component: WhiteSection,
} as Meta;

export const Template: Story = (args) => (
    <>
        <div style={{ height: 200 }}></div>
        <WhiteSection {...args}>
            <h3>White Section</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et neque eget tortor
                viverra porta non ut odio. Nulla porta iaculis diam hendrerit ultrices. Nunc
                consequat nisl vitae felis condimentum, id elementum arcu hendrerit. Nam eu placerat
                nunc. Quisque dapibus nibh at ante posuere auctor. Vivamus eget ex dictum, dapibus
                erat eget, vehicula diam. Proin sed finibus felis, at placerat erat. Nunc fermentum
                magna in mi dignissim scelerisque. Pellentesque quis augue sem. Sed mattis libero id
                nulla lobortis molestie. Etiam placerat, velit quis ultricies sagittis, metus elit
                ultrices tortor, in dictum purus ligula ut odio. Duis lorem ex, imperdiet ac dolor
                sed, semper hendrerit tellus. Phasellus suscipit, felis sed tempus vestibulum, mi
                lorem tempor leo, sit amet ultrices sem mauris vitae purus.
            </p>

            <p>
                Donec sit amet lorem dolor. Morbi vulputate magna eu ipsum pretium, eget tempus
                tellus efficitur. Nullam placerat dolor vitae aliquet ornare. Vivamus eu ante
                ligula. Vivamus id nisi leo. Cras sed laoreet nulla, vel luctus nisl. Donec
                scelerisque tempor sollicitudin. Sed a sem sit amet ante consectetur consectetur ac
                eu libero. Integer enim quam, porttitor nec fermentum non, efficitur sit amet sem.
                Nunc sit amet magna eget nisl sollicitudin malesuada. Ut luctus odio a congue
                laoreet.
            </p>

            <p>
                Curabitur sed elementum neque. Aenean sodales leo ac augue molestie, vel blandit
                urna ultricies. Nulla nibh erat, semper laoreet nunc eget, rhoncus pretium mauris.
                Donec vel urna felis. Nullam luctus, risus ut suscipit fermentum, eros dui lobortis
                nulla, ut scelerisque justo sapien condimentum sem. Donec augue elit, lacinia a urna
                quis, imperdiet eleifend libero. Aliquam faucibus maximus nibh, vel suscipit arcu
                vehicula tristique. Proin mollis egestas eleifend. Quisque ut convallis dolor. Nam
                tempor condimentum dui ut rutrum. Aenean diam libero, cursus sit amet luctus ut,
                tincidunt ut enim. Etiam ut rhoncus velit.
            </p>
        </WhiteSection>
    </>
);
