/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface NavCartButtonProps {
    cartProductsCount: number;
}

export const NavCartButton: React.FC<NavCartButtonProps> = ({ cartProductsCount }) => (
    <div
        css={css`
            position: relative;
            transition: 0.2s;
            cursor: pointer;
            &:hover {
                transform: translateY(-3px);
            }
        `}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            css={css`
                height: 30px;
            `}
        >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
        </svg>
        {cartProductsCount > 0 && (
            <div
                css={css`
                    height: 18px;
                    width: 18px;
                    background-color: #ed1b24;
                    color: white;
                    position: absolute;
                    top: -4px;
                    right: -8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.7rem;
                    border-radius: 100%;
                `}
            >
                {cartProductsCount}
            </div>
        )}
    </div>
);
