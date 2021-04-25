/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const categoriesGridStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    width: 100%;
`;

export const CategoriesGrid: React.FC = ({ children }) => (
    <div css={categoriesGridStyles}>{children}</div>
);
