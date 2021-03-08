/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const specialtiesGridStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    max-width: 1150px;
    align-items: center;
    justify-content: center;
`;

export const SpecialtiesGrid: React.FC = ({ children }) => (
    <div css={specialtiesGridStyles}>{children}</div>
);
