/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

const categoriesSliderStyles = css`
    font-family: 'Montserrat', sans-serif;
    width: 100%;
    display: flex;
    align-items: center;
    color: black;
    svg {
        height: 25px;
        cursor: pointer;
    }
    .categories {
        display: flex;
        overflow-y: hidden;
        overflow-x: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
        white-space: nowrap;
        flex: 1;
        margin: 0 10px;
    }
`;

function isOverflown(element: HTMLDivElement) {
    return element.scrollWidth > element.clientWidth;
}

function scroll(wrapper: HTMLDivElement, scrollBy: number) {
    wrapper.scrollBy({ left: scrollBy, behavior: 'smooth' });
}

export const CategoriesSlider: React.FC = ({ children }) => {
    const categoriesWrapper = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <div
            css={css`
                ${categoriesSliderStyles}
                svg {
                    display: ${categoriesWrapper.current &&
                    (isOverflown(categoriesWrapper.current) ? 'block' : 'none')};
                }
            `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="left"
                viewBox="0 0 16 16"
                onClick={() => {
                    if (categoriesWrapper.current) {
                        scroll(categoriesWrapper.current, -categoriesWrapper.current.clientWidth);
                    }
                }}
            >
                <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
            </svg>
            <div className="categories" ref={categoriesWrapper}>
                {children}
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="right"
                viewBox="0 0 16 16"
                onClick={() => {
                    if (categoriesWrapper.current) {
                        scroll(categoriesWrapper.current, categoriesWrapper.current.clientWidth);
                    }
                }}
            >
                <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
            </svg>
        </div>
    );
};
