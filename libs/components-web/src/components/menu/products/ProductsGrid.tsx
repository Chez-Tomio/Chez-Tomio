/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface ProductsGridProps {
    minSize?: number;
}

export const ProductsGrid: React.FC<ProductsGridProps> = ({ children, minSize = '500px' }) => (
    <div
        css={css`
            font-family: 'Montserrat', sans-serif;
            display: grid;
            grid-gap: 20px;
            width: 100%;
            margin-top: 20px;
            @media (min-width: 800px) {
                grid-template-columns: repeat(2, 1fr);
            }
            @media (min-width: 1500px) {
                grid-template-columns: repeat(3, 1fr);
            }
            @media (min-width: 2000px) {
                grid-template-columns: repeat(4, 1fr);
            }
        `}
    >
        {children}
    </div>
);
