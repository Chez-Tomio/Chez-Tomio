/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface CategoryProps {
    imageUrl: string;
}

export const CategoryTile: React.FC<CategoryProps> = ({ children, imageUrl }) => (
    <div
        css={css`
            font-family: 'Montserrat', sans-serif;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 20px;
            /* width: 100%; */
            height: 250px;
            cursor: pointer;
            transition: all 0.5s;
            color: white;
            background: rgba(0, 0, 0, 0.5) url(${imageUrl});
            background-blend-mode: darken;
            background-position: center;
            background-size: cover;
            h3 {
                transition: all 0.3s;
            }
            &:hover {
                background: rgba(0, 0, 0, 0.2) url(${imageUrl});
                background-blend-mode: darken;
                background-position: center;
                background-size: cover;
                h3 {
                    transform: translateY(-5px);
                }
            }
        `}
    >
        <h3>{children}</h3>
    </div>
);
