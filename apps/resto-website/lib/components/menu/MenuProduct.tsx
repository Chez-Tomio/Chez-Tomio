/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ProductTile, Quantity } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { useFormik } from 'formik';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';

import { ExtraDTO } from '../../api/dto/checkout';
import { ISerializedProduct } from '../../database/mongo';
import { toPrice } from '../../utils/clients';

const { globalConfig } = getConfig().publicRuntimeConfig;

export const MenuProduct: React.FC<{
    product: ISerializedProduct;
    onAddToCart: (formData) => void;
}> = ({ product, onAddToCart }) => {
    const [productOptions, setProductOptions] = useState(false);

    const [scrollTop, setScrollTop] = useState(0);
    const [scrollBottom, setScrollBottom] = useState(0);
    const scrollableContent = React.useRef<HTMLDivElement>(null);

    const router = useRouter();

    function updateScroll(element) {
        setScrollTop(element.scrollTop);
        setScrollBottom(element.scrollTop - element.scrollHeight + element.offsetHeight);
    }

    useEffect(() => {
        if (scrollableContent.current) {
            updateScroll(scrollableContent.current);
        }
    }, [productOptions]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (scrollableContent.current) {
                updateScroll(scrollableContent.current);
            }
        });
    }, []);

    function addToCart(formData) {
        setProductOptions(false);
        onAddToCart(formData);
    }

    const formik = useFormik({
        initialValues: {
            id: product._id,
            count: 1,
            instructions: '',
            extras: [] as ExtraDTO[],
        },
        onSubmit: (values, { setSubmitting }) => {
            values.extras = values.extras.filter((e) => e.count >= 1);
            if (isNaN(values.count)) values.count = 1;
            addToCart(values);
            setSubmitting(false);
        },
    });

    return (
        <div>
            <ProductTile
                key={product._id}
                imageUrl={product.image ?? ''}
                title={product.title[router.locale ?? 'fr']}
                description={product.description[router.locale ?? 'fr']}
                price={toPrice(product.basePrice)}
                onClickAdd={() => {
                    setProductOptions(true);
                }}
            />
            <Popup open={productOptions} onClose={() => setProductOptions(false)}>
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    `}
                >
                    <div
                        className="header"
                        css={css`
                            padding: 10px;
                            transition: box-shadow 0.3s;
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
                        className="content"
                        ref={scrollableContent}
                        onScroll={(e) => updateScroll(e.target)}
                        css={css`
                            flex: 1;
                            overflow-y: auto;
                            padding: 20px;
                        `}
                    >
                        <form
                            id="product-form"
                            onSubmit={formik.handleSubmit}
                            css={css`
                                .item {
                                    padding: 5px;
                                    display: flex;
                                    flex-direction: column;
                                    text-align: left;
                                    width: 40%;
                                    min-width: 150px;
                                    max-width: 250px;
                                    * {
                                        width: 100%;
                                    }
                                    label {
                                        font-size: 0.9rem;
                                    }
                                    .error {
                                        color: red;
                                        font-size: 0.7rem;
                                        margin-bottom: 15px;
                                    }
                                }
                            `}
                        >
                            <div
                                css={css`
                                    margin-bottom: 20px;
                                    display: flex;
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
                                    />
                                )}
                            </div>

                            {product.extras.length > 0 && (
                                <div
                                    css={css`
                                        display: flex;
                                        flex-direction: column;
                                        margin-bottom: 20px;
                                    `}
                                >
                                    <span
                                        css={css`
                                            margin: 0;
                                            font-weight: 600;
                                            font-size: 1.1rem;
                                        `}
                                    >
                                        Extras
                                    </span>
                                    <small
                                        css={css`
                                            margin-bottom: 10px;
                                        `}
                                    >
                                        Maximum 3 per extra
                                    </small>
                                    {product.extras.map((e, i) => {
                                        const [extraQuantity, setExtraQuantity] = useState(0);
                                        return (
                                            <div
                                                key={e._id}
                                                css={css`
                                                    display: flex;
                                                    align-items: center;
                                                    margin-bottom: 10px;
                                                `}
                                            >
                                                <Quantity
                                                    getQuantity={(q) => {
                                                        setExtraQuantity(q);
                                                        formik.values.extras[i] = {
                                                            id: e._id,
                                                            count: q,
                                                        };
                                                    }}
                                                    minimumQuantity={0}
                                                    maximumQuantity={3}
                                                ></Quantity>
                                                <span
                                                    css={css`
                                                        font-weight: 500;
                                                        margin-left: 20px;
                                                    `}
                                                >
                                                    {`${e.title[router.locale ?? 'fr']} (${toPrice(
                                                        e.price,
                                                    )})`}
                                                    {extraQuantity > 0 && (
                                                        <span
                                                            css={css`
                                                                color: #0ec663;
                                                                margin-left: 12px;
                                                                font-size: 0.9rem;
                                                            `}
                                                        >
                                                            + {toPrice(extraQuantity * e.price)}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            <div
                                className="field"
                                css={css`
                                    padding: 20px;
                                `}
                            >
                                <textarea
                                    name="instructions"
                                    placeholder="Special instructions"
                                    maxLength={500}
                                    rows={5}
                                    css={css`
                                        width: 100%;
                                        resize: vertical;
                                        overflow: auto;
                                    `}
                                    onChange={formik.handleChange}
                                    value={formik.values.instructions}
                                ></textarea>
                            </div>
                        </form>
                    </div>

                    <div
                        className="footer"
                        css={css`
                            padding: 10px;
                            transition: box-shadow 0.3s;
                            box-shadow: ${scrollBottom < 0
                                ? 'rgba(0, 0, 0, 0.2) 0px calc(1px) 15px'
                                : 'none'};
                            mix-blend-mode: multiply;
                            display: flex;
                            align-items: center;
                            justify-content: flex-end;
                        `}
                    >
                        <Quantity
                            form="product-form"
                            getQuantity={(q) => {
                                formik.values.count = q;
                            }}
                        ></Quantity>
                        <Button primary={true} form="product-form" type="submit">
                            Add to cart -
                            {' ' +
                                toPrice(
                                    formik.values.count *
                                        (product.basePrice +
                                            formik.values.extras.reduce(
                                                (acc, extra: ExtraDTO) =>
                                                    acc +
                                                    (product.extras.find((e) => e._id === extra.id)
                                                        ?.price ?? 0) *
                                                        extra.count,
                                                0,
                                            )),
                                )}
                        </Button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};
