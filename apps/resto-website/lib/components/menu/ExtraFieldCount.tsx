/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FieldProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export const ExtraFieldCount: React.FC<FieldProps & { extra }> = ({ extra, field, form }) => {
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    useEffect(() => {
        form.setFieldValue(field.name + '.count', quantity);
        form.setFieldValue(field.name + '.id', extra._id);
    }, [quantity]);

    return (
        <div className="item">
            <div
                css={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `}
            >
                <label
                    htmlFor={`${field.name}.count`}
                    css={css`
                        margin-right: 20px;
                    `}
                >
                    {extra.title[router.locale ?? 'fr']} (+$
                    {extra.price} each)
                </label>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        max-width: 100px;
                        input {
                            margin: 5px;
                            height: 35px;
                            font-size: 0.9rem;
                            border-radius: 5px;
                            border: 1px #f0f0f0 solid;
                            padding: 5px;
                            min-width: 50px;
                            appearance: textfield;
                        }
                        .button {
                            cursor: pointer;
                            max-width: 20px;
                            max-height: 20px;
                            min-width: 20px;
                            min-height: 20px;
                            transition: 0.2s;
                            &:hover {
                                transform: scale(105%);
                            }
                        }
                    `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="button minus"
                        viewBox="0 0 16 16"
                        onClick={() => setQuantity((q) => q - 1)}
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                    </svg>
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={(e) => {
                            setQuantity(parseInt(e.target.value));
                        }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="button plus"
                        viewBox="0 0 16 16"
                        onClick={() => setQuantity((q) => q + 1)}
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};
