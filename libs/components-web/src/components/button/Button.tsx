import styled from '@emotion/styled';
// import React from 'react';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
    primary?: boolean;
    backgroundColor?: string;
    size?: ButtonSize;
    onClick?: () => void;
}

const fontSizes: { [k in ButtonSize]: string } = {
    small: '12px',
    medium: '14px',
    large: '16px',
};
const paddings: { [k in ButtonSize]: string } = {
    small: '10px 16px',
    medium: '11px 20px',
    large: '12px 24px',
};

export const Button = styled.button<ButtonProps>`
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    color: ${(props) => (props.primary ? 'white' : '#333')};
    background-color: ${(props) => (props.primary ? '#1ea7fd' : 'transparent')};
    box-shadow: ${(props) =>
        !props.primary ? 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset' : 'none'};
    font-size: ${(props) => fontSizes[props.size ?? 'medium']};
    padding: ${(props) => paddings[props.size ?? 'medium']};
`;
