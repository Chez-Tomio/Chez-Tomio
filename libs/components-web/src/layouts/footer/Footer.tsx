/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface FooterProps {
    leftText: string;
    rightText: string;
}

const footerStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 25px 5%;
    display: flex;
    background-color: black;
    font-size: 0.8rem;
    width: 100%;
    span {
        flex: 1;
        &.left-text {
            text-align: left;
        }
        &.right-text {
            text-align: right;
        }
    }
`;

export const Footer: React.FC<FooterProps> = ({ rightText, leftText }) => (
    <footer css={footerStyles}>
        <span className="left-text">{leftText}</span>
        <span className="right-text">{rightText}</span>
    </footer>
);
