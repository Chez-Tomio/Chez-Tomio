/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface HeaderProps {
    backgroundFull?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ children, backgroundFull = false }) => (
    <header
        css={css`
            font-family: 'Montserrat', sans-serif;
            padding: 10px 5%;
            color: white;
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            justify-content: center;
            align-items: center;
            background-color: ${backgroundFull && 'black'};
            @media (max-height: 320px) {
                height: 90px;
            }
            @media (min-height: 321px) {
                height: 120px;
            }
        `}
    >
        {children}
    </header>
);

export const HeaderSpace: React.FC = () => (
    <div
        css={css`
            flex: 1;
        `}
    />
);
