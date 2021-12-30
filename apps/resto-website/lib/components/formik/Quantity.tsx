/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';

export interface QuantityProps {
    getQuantity: (quantity: number) => void;
    minimumQuantity?: number;
}

export const Quantity: React.FC<QuantityProps> = ({ getQuantity, minimumQuantity = 1 }) => {
    const [quantity, setQuantity] = useState(minimumQuantity);

    useEffect(() => {
        getQuantity(quantity);
    }, [quantity]);

    return (
        <div
            css={css`
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 100px;
                .field {
                    margin: 5px;
                    min-width: 50px;

                    input {
                        padding: 5px;
                        height: 35px;
                        width: 100%;
                    }
                }
                .button {
                    cursor: pointer;
                    max-width: 20px;
                    max-height: 20px;
                    min-width: 20px;
                    min-height: 20px;
                    transition: 0.2s;
                }
            `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="button minus"
                viewBox="0 0 16 16"
                onClick={() => quantity > minimumQuantity && setQuantity((q) => q - 1)}
            >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
            <div className="field">
                <input
                    onFocus={blur}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= minimumQuantity || isNaN(value)) {
                            setQuantity(value);
                        }
                    }}
                />
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="button plus"
                viewBox="0 0 16 16"
                onClick={() => setQuantity((q) => q + 1)}
            >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
        </div>
    );
};
