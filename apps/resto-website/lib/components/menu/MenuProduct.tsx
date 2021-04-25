/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ProductTile } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { ISerializedProduct } from '../../database/mongo';
import { Quantity } from '../formik/Quantity';
import { ExtraFieldCount } from './ExtraFieldCount';

export const MenuProduct: React.FC<{
    product: ISerializedProduct;
    onAddToCart: (formData) => void;
}> = ({ product, onAddToCart }) => {
    const [productOptions, setProductOptions] = useState(false);
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
                        align-items: center;
                        justify-content: center;
                        min-height: 100%;
                    `}
                >
                    <h3
                        css={css`
                            margin-bottom: 20px;
                        `}
                    >
                        {product.title[router.locale ?? 'fr']}
                    </h3>
                    <Formik
                        initialValues={{
                            id: product._id,
                            count: 1,
                            extras: [],
                        }}
                        // validationSchema={ProductsFormSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            addToCart(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ values, isSubmitting, errors }) => (
                            <Form
                                css={css`
                                    display: flex;
                                    flex-direction: column;
                                    color: black;
                                    width: 100%;
                                    align-items: center;
                                    justify-content: center;
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
                                <div className="item">
                                    <div
                                        css={css`
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                        `}
                                    >
                                        <label
                                            htmlFor="count"
                                            css={css`
                                                margin-right: 20px;
                                            `}
                                        >
                                            Quantity
                                        </label>
                                        <Field name="count" component={Quantity} />
                                    </div>

                                    <ErrorMessage name="count" component="span" className="error" />
                                </div>

                                <hr />

                                <h4>Extras</h4>
                                {product.extras.map((e, i) => (
                                    <div className="item" key={e._id}>
                                        <Field
                                            name={`extras[${i}]`}
                                            component={ExtraFieldCount}
                                            {...{
                                                extra: e,
                                            }}
                                        />

                                        <ErrorMessage
                                            name={`extras[${i}]`}
                                            component="span"
                                            className="error"
                                        />
                                    </div>
                                ))}

                                <hr />

                                <h4>Price</h4>

                                <Button type="submit" primary={true} disabled={isSubmitting}>
                                    Add to Cart
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Popup>
        </div>
    );
};
