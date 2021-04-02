/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useGesture } from 'react-use-gesture';
import { NavWrapper } from '../..';

export interface NavProps {
    stacked?: boolean;
}

const mobileNavStyles = css`
    padding: 40px 0 100px 0;
    position: fixed;
    top: 0;
    right: 0;
    background-color: #fff;
    z-index: 1000;
    overflow: hidden;
    height: 100vh;
    transition: width 0.3s;
    max-width: 100vw;
    .close {
        cursor: pointer;
        color: #000;
        height: 50px;
        position: absolute;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%);
        transition: transform 0.2s;
        &:hover {
            transform: translateX(-50%) translateY(-5px) scale(110%);
        }
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        overflow: auto;
        .nav-item {
            color: black;
            .nav-item-li {
                border-color: #000;
                &:hover {
                    background-color: #f0f0f0;
                }
            }
        }
    }
`;

const navStyles = css`
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    ul {
        list-style: none;
        display: flex;
    }
`;

export const Nav: React.FC<NavProps> = ({ children, stacked }) => {
    const { isHamburger, isOpen, setIsOpen } = useContext(NavWrapper.Context);

    if (typeof window !== 'undefined') {
        useGesture(
            {
                onDrag: ({ movement: [mx] }) => {
                    if (isHamburger && mx < -5) {
                        setIsOpen(true);
                    }
                    if (isHamburger && mx > 5) {
                        setIsOpen(false);
                    }
                },
            },
            {
                domTarget: window,
            },
        );
    }

    if (isHamburger) {
        return (
            <div>
                {/* Mobile Nav Button */}
                <svg
                    viewBox="0 0 16 16"
                    css={css`
                        height: 40px;
                        cursor: pointer;
                    `}
                    onClick={() => {
                        setIsOpen(true);
                    }}
                >
                    <path
                        fill="currentColor"
                        d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                    />
                </svg>

                {/* Overlay */}
                <div
                    css={css`
                        position: fixed;
                        background-color: #000;
                        transition: visibility 0.3s linear, opacity 0.3s linear;
                        visibility: ${isOpen ? 'visible' : 'hidden'};
                        opacity: ${isOpen ? '0.5' : '0'};
                        height: 100vh;
                        width: 100vw;
                        z-index: 999;
                        top: 0;
                        left: 0;
                    `}
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />

                {/* Side Nav */}
                <nav
                    css={css`
                        ${mobileNavStyles}
                        width: ${isOpen ? '500px' : '0'};
                    `}
                >
                    <ul>{children}</ul>
                    <svg className="close" viewBox="0 0 16 16" onClick={() => setIsOpen(false)}>
                        <path
                            fill="currentColor"
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
                </nav>
            </div>
        );
    } else {
        return (
            <nav css={navStyles} className="normalNavbar">
                <ul
                    css={css`
                        flex-direction: ${stacked ? 'column' : ''};
                    `}
                >
                    {children}
                </ul>
            </nav>
        );
    }
};
