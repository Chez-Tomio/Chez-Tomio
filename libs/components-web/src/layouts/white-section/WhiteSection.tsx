/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const waveStyles = css`
    position: absolute;
    width: 100%;
    color: white;
    left: 0;
    @media (max-width: 1024px), (max-height: 480px) {
        height: 50px;
        &.top-wave {
            top: -49px;
        }
        &.bottom-wave {
            bottom: -49px;
        }
    }
    @media (min-width: 1025px), (min-height: 481px) {
        height: 80px;
        &.top-wave {
            top: -79px;
        }
        &.bottom-wave {
            bottom: -79px;
        }
    }
`;

const whiteSectionStyles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 60px 5%;
    background-color: white;
    position: relative;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const WhiteSection: React.FC = ({ children }) => (
    <div css={whiteSectionStyles}>
        <svg
            css={waveStyles}
            className="top-wave"
            viewBox="0 0 1440 109"
            fill="none"
            preserveAspectRatio="none"
        >
            <path
                d="M0 41.1531C0 41.1531 219.411 82.3061 360 82.3061C500.589 82.3061 720 41.1531 720 41.1531C720 41.1531 936.472 0 1080 0C1220 0 1440 41.1531 1440 41.1531V109H0V41.1531Z"
                fill="currentColor"
            />
        </svg>
        {children}
        <svg
            css={waveStyles}
            className="bottom-wave"
            viewBox="0 0 1440 109"
            fill="none"
            preserveAspectRatio="none"
        >
            <path
                d="M1440 67.8469C1440 67.8469 1220.59 26.6939 1080 26.6939C939.411 26.6939 720 67.8469 720 67.8469C720 67.8469 503.528 109 360 109C220 109 0 67.8469 0 67.8469V7.62939e-06L1440 7.62939e-06V67.8469Z"
                fill="currentColor"
            />
        </svg>
    </div>
);
