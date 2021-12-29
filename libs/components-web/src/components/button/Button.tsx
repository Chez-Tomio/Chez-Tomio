import styled from '@emotion/styled';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
    primary?: boolean;
    size?: ButtonSize;
    noMargin?: boolean;
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
    line-height: 1;
    transition: 0.2s;
    color: white;
    background-color: ${(props) => (props.primary ? '#ED1B24' : 'transparent')};
    font-size: 1rem;
    padding: ${(props) => paddings[props.size ?? 'medium']};
    border: ${(props) => (props.primary ? '' : '2px solid #fff')};
    margin: ${(props) => (props.noMargin ? '0' : '10px 20px')};
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        height: 24px;
        margin-right: 5px;
    }
    &:hover {
        color: ${(props) => (props.primary ? '' : '#000')};
        background-color: ${(props) => (props.primary ? '#ac1b24' : '#fff')};
    }
    &:disabled {
        background-color: ${(props) => (props.primary ? '#ed777d' : 'transparent')};
        cursor: auto;
    }
`;
