/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface CartProductProps {
    title: string;
    image?: string;
    quantity: number;
    price: string;
    extras?: string;
    remove: () => void;
}

export const CartProduct: React.FC<CartProductProps> = ({
    title,
    image,
    quantity,
    price,
    extras,
    remove,
}) => {
    return (
        <div
            className="cart-product"
            css={css`
                color: black;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
                border-top: #f7f7f7 solid 2px;
            `}
        >
            <div
                css={css`
                    background-color: black;
                    color: white;
                    border-radius: 100%;
                    height: 35px;
                    width: 35px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 10px;
                    cursor: pointer;
                `}
            >
                {quantity}&times;
            </div>

            {image && (
                <div
                    css={css`
                        height: 80px;
                        width: 80px;
                        background-image: url(${image});
                        background-size: cover;
                        background-position: center;
                        border-radius: 10px;
                        margin-right: 10px;
                    `}
                />
            )}

            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <h4
                        css={css`
                            font-weight: bold;
                            margin: 0;
                        `}
                    >
                        {title}
                    </h4>
                    {extras && (
                        <span
                            css={css`
                                margin-left: 5px;
                            `}
                        >
                            (Extras: {extras && extras})
                        </span>
                    )}
                </div>

                <span
                    css={css`
                        font-size: 0.8rem;
                        margin-bottom: 5px;
                    `}
                >
                    "Instructions"
                </span>

                <span>{price}</span>
            </div>

            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={remove}
                    css={css`
                        height: 25px;
                        color: black;
                        cursor: pointer;
                        transition: 0.2s;
                        &:hover {
                            transform: translateY(-3px);
                        }
                    `}
                >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
            </div>
        </div>
    );
};
