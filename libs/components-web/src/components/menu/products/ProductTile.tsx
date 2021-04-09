/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface ProductProps {
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    onClickAdd: () => void;
}

const productStyles = css`
    font-family: 'Montserrat', sans-serif;
    position: relative;
    margin: 20px;

    .tile {
        height: 150px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        transition: all 0.5s;
        color: black;
        overflow: hidden;
        box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 2;
        position: relative;
        background-color: white;
        margin-bottom: 0px;
        .content {
            padding: 20px;
            .price {
                font-weight: 400;
                font-size: 2.5rem;
            }
        }
        .add-btn {
            height: 30px;
            width: 30px;
            color: #0ec663;
            position: absolute;
            bottom: 10px;
            right: 10px;
            transition: 0.3s;
            cursor: pointer;
            &:hover {
                transform: scale(110%);
            }
        }
    }
    .description {
        max-height: 0;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-color: #f0f0f0;
        position: relative;
        bottom: 20px;
        left: 0;
        transition: 0.5s;
        display: flex;
        align-items: flex-end;
        overflow: hidden;
        .content {
            margin: 30px 20px 10px 20px;
        }
    }
    &:hover {
        .description {
            max-height: 200px;
        }
    }
`;

export const ProductTile: React.FC<ProductProps> = ({
    imageUrl,
    title,
    description,
    price,
    onClickAdd,
}) => (
    <div css={productStyles}>
        <div className="tile">
            <div
                css={css`
                    background-image: url(${imageUrl});
                    background-position: center;
                    background-size: cover;
                    height: 100%;
                    width: 40%;
                `}
            ></div>
            <div className="content">
                <h3 className="title">{title}</h3>
                <h1 className="price">${price}</h1>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="add-btn"
                viewBox="0 0 16 16"
                onClick={() => onClickAdd()}
            >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
        </div>

        <div
            className="description"
            css={css`
                width: 100%;
                height: 100%;
            `}
        >
            <div className="content">{description}</div>
        </div>
    </div>
);
