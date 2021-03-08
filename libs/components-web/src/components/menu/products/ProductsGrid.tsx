/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const productsGridStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

export const ProductsGrid: React.FC = ({ children }) => (
    <div css={productsGridStyles}>{children}</div>
);
