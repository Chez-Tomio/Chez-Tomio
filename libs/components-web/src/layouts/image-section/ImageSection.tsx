/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { isMobile } from 'react-device-detect';

export type ImageSectionSize = 'normal' | 'half' | 'fill';

export interface ImageSectionProps {
    imageUrl: string;
    opacity?: number;
    size?: ImageSectionSize;
}

const heights: { [k in ImageSectionSize]: string } = {
    normal: '600px',
    half: '50vh',
    fill: '100vh',
};

export const ImageSection: React.FC<ImageSectionProps> = ({
    children,
    imageUrl,
    opacity,
    size,
}) => (
    <div
        css={css`
            font-family: 'Montserrat', sans-serif;
            padding: 120px 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            max-height: 100vh;
            background: rgba(0, 0, 0, ${opacity ?? 0.65}) url(${imageUrl});
            background-blend-mode: darken;
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            background-attachment: ${!isMobile && 'fixed'};
            height: ${heights[size ?? 'normal']};
            min-height: 400px;
        `}
    >
        {children}
    </div>
);
