/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ProductTile } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { ExtraDTO } from '../../api/dto/checkout';
import { ISerializedProduct } from '../../database/mongo';
import { Quantity } from '../formik/Quantity';
import { ExtraFieldCount } from './ExtraFieldCount';

const { globalConfig } = getConfig().publicRuntimeConfig;

function useScroll() {
    const [scrollTop, setScrollTop] = useState(0);
    const [scrollBottom, setScrollBottom] = useState(0);
    const updateScroll = (e) => {
        const element = e.target;
        const contentScrollHeight = element.scrollHeight - element.offsetHeight;
        setScrollTop(element.scrollTop);
        setScrollBottom(element.scrollTop - contentScrollHeight);
        console.log(element.scrollTop - contentScrollHeight);
    };
    return [scrollTop, scrollBottom, { onScroll: updateScroll, onresize: updateScroll }];
}

export const MenuProduct: React.FC<{
    product: ISerializedProduct;
    onAddToCart: (formData) => void;
}> = ({ product, onAddToCart }) => {
    const [productOptions, setProductOptions] = useState(false);
    const [scrollTop, scrollBottom, scrollProps] = useScroll();
    const router = useRouter();

    function addToCart(formData) {
        setProductOptions(false);
        onAddToCart(formData);
    }

    return (
        <div>
            <ProductTile
                key={product._id}
                imageUrl={product.image ?? ''}
                title={product.title[router.locale ?? 'fr']}
                description={product.description[router.locale ?? 'fr']}
                price={product.basePrice}
                onClickAdd={() => {
                    setProductOptions(true);
                }}
            />
            <Popup
                open={productOptions}
                closeOnDocumentClick
                onClose={() => setProductOptions(false)}
            >
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    `}
                >
                    <div
                        css={css`
                            padding: 10px;
                            box-shadow: ${scrollTop > 0
                                ? 'rgba(0, 0, 0, 0.2) 0px calc(1px) 15px'
                                : 'none'};
                            mix-blend-mode: multiply;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <svg
                            className="close"
                            viewBox="0 0 16 16"
                            css={css`
                                height: 40px;
                                cursor: pointer;
                            `}
                            onClick={() => setProductOptions(false)}
                        >
                            <path
                                fill="currentColor"
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                        </svg>
                    </div>

                    <div
                        {...scrollProps}
                        css={css`
                            flex: 1;
                            overflow-y: auto;
                            transition: box-shadow 0.3s;
                        `}
                    >
                        <div
                            css={css`
                                margin-bottom: 20px;
                                display: flex;
                                padding: 20px;
                            `}
                        >
                            <div
                                css={css`
                                    flex: 1;
                                `}
                            >
                                <h3>{product.title[router.locale ?? 'fr']}</h3>
                                <span>{product.description[router.locale ?? 'fr']}</span>
                            </div>
                            {product.image && (
                                <div
                                    css={css`
                                        height: 150px;
                                        width: 150px;
                                        margin-left: 20px;
                                        background-image: url(${product.image});
                                        background-size: cover;
                                        background-position: center;
                                        border-radius: 10px;
                                    `}
                                ></div>
                            )}
                        </div>
                    </div>

                    <div
                        css={css`
                            padding: 10px;
                            box-shadow: ${scrollBottom < 0
                                ? 'rgba(0, 0, 0, 0.2) 0px calc(1px) 15px'
                                : 'none'};
                            mix-blend-mode: multiply;
                            display: flex;
                            align-items: center;
                        `}
                    >
                        <Button primary={true}>Add to cart - ${product.basePrice}</Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};
