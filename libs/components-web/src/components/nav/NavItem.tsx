/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface NavItemProps {
    href: string;
    border?: boolean;
}

const navItemStyles = css`
    font-family: 'Montserrat', sans-serif;
    text-decoration: none;
    display: inline-block;
    color: #fff;
    outline: none;
    font-weight: 500;
    &:hover {
        .nav-item-li {
            .nav-item-text::after {
                width: 100%;
                transition: width 0.3s;
            }
        }
    }
    .nav-item-li {
        margin: 5px 15px;
        padding: 15px 20px;
        list-style: none;
        cursor: pointer;
        transition: 0.2s;
        .nav-item-text {
            display: inline-block;
            &:active {
                font-weight: 700;
            }
            &::after {
                content: '';
                display: block;
                width: 0;
                height: 2px;
                background: #ed1b24;
                transition: width 0.3s;
            }
        }
    }
`;

export const NavItem: React.FC<NavItemProps> = ({ children, href, border }) => (
    <a className="nav-item" href={href} css={navItemStyles}>
        <li
            className="nav-item-li"
            css={css`
                border: ${border ? '#fff solid 2px' : ''};
                border-radius: 5px;
            `}
        >
            <span className="nav-item-text">{children}</span>
        </li>
    </a>
);
