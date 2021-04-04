/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const headerStyles = css`
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
    @media (max-height: 320px) {
        height: 90px;
    }
    @media (min-height: 321px) {
        height: 120px;
    }
`;

export const Header: React.FC = ({ children }) => <header css={headerStyles}>{children}</header>;

export const HeaderSpace: React.FC = () => (
    <div
        css={css`
            flex: 1;
        `}
    />
);
