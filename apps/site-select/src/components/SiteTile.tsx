/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface SiteTileProps {
    href: string;
    imageUrl: string;
}

export const SiteTile: React.FC<SiteTileProps> = ({ children, href, imageUrl }) => (
    <a
        href={href}
        css={css`
            font-family: 'Montserrat', sans-serif;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 20px;
            margin: 20px;
            width: 100%;
            min-height: 300px;
            cursor: pointer;
            transition: all 0.5s;
            color: white;
            background: rgba(0, 0, 0, 0.5) url(${imageUrl});
            background-blend-mode: darken;
            background-position: center;
            background-size: cover;
            text-align: center;
            text-decoration: none;
            h3 {
                transition: all 0.3s;
                text-shadow: 0px 0px 0px #000;
            }
            &:hover {
                background: rgba(0, 0, 0, 0.3) url(${imageUrl});
                background-blend-mode: darken;
                background-position: center;
                background-size: cover;
                h3 {
                    transform: scale(1.2);
                    text-shadow: 0px 0px 10px #000;
                }
            }
        `}
    >
        <h3>{children}</h3>
    </a>
);
