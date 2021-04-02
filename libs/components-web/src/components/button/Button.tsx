import styled from '@emotion/styled';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
    primary?: boolean;
    size?: ButtonSize;
    onClick?: () => void;
}

const paddings: { [k in ButtonSize]: string } = {
    small: '10px 20px',
    medium: '15px 30px',
    large: '20px 40px',
};

export const Button = styled.button<ButtonProps>`
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    transition: 0.2s;
    color: white;
    background-color: ${(props) => (props.primary ? '#ED1B24' : 'transparent')};
    box-shadow: ${(props) =>
        !props.primary ? 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset' : 'none'};
    font-size: 1rem;
    padding: ${(props) => paddings[props.size ?? 'medium']};
    border: ${(props) => (props.primary ? '' : '2px solid #fff')};
    margin: 10px 20px;
    &:hover {
        color: ${(props) => (props.primary ? '' : '#000')};
        background-color: ${(props) => (props.primary ? '#ac1b24' : '#fff')};
    }
`;
