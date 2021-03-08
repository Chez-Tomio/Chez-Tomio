/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface ProductProps {
    imageUrl: string;
}

const productStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    /* display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    width: 100%;
    height: 250px;
    cursor: pointer;
    transition: all 0.5s;
    h3 {
        transition: all 0.3s;
    } */
`;

export const Product: React.FC<ProductProps> = ({ children, imageUrl }) => (
    <div css={productStyles}>{children}</div>
);
