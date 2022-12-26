/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, CartProduct, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { round } from 'lodash';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import * as Yup from 'yup';

import { CheckoutDTO, ProductDTO, ProductDTOWithMetadata } from '../lib/api/dto/checkout';
import { NextImageSection } from '../lib/components/common/NextImageSection';
import { connectToDatabase, ISerializedProduct, Product } from '../lib/database/mongo';
import { GlobalDispatchContext, GlobalStateContext, SET_CART_PRODUCTS } from '../lib/GlobalState';
import { getTotalProductPrice, toPrice } from '../lib/utils/clients';
import { requiresStoreToBeEnabled } from '../lib/utils/server';

const { globalConfig } = getConfig().publicRuntimeConfig;
const { cartConfig } = getConfig().publicRuntimeConfig.pagesConfig;

const phoneUtil = PhoneNumberUtil.getInstance();

Yup.addMethod(Yup.string, 'phone', function (errorMessage = 'Phone number is not valid') {
    return this.test('phone', errorMessage, (v) => {
        try {
            return phoneUtil.isValidNumber(phoneUtil.parse(v, 'US'));
        } catch {
            return false;
        }
    });
});

export default function Options({ allProducts }: { allProducts: ISerializedProduct[] }) {
    const router = useRouter();
    const { t } = useTranslation('checkout');
    const [productDTOArray, setProductDTOArray] = useState<ProductDTO[]>([]);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();

    const globalState = useContext(GlobalStateContext);

    useEffect(() => {
        // Load Stripe
        setStripePromise(loadStripe(globalConfig.stripePublicKey));
    }, []);

    useEffect(() => {
        const productDTOInState = globalState.cartProducts
            .map((productDTO: ProductDTO) => {
                const product = allProducts.find((p) => p._id === productDTO.id);
                if (!product) return undefined;
                productDTO.extras = productDTO.extras.filter((extraDTO) =>
                    product.extras.find((e) => e._id === extraDTO.id),
                );
                return productDTO;
            })
            .filter((p: ProductDTO | undefined) => p !== undefined);
        setProductDTOArray(productDTOInState);
    }, [globalState.cartProducts]);

    async function checkout(contactPhoneNumber: string) {
        try {
            const stripe = await stripePromise;
            if (!stripe) throw 'Stripe could not be loaded';
            const checkoutDTO: CheckoutDTO = {
                contactPhoneNumber,
                products: productDTOArray,
            };

            console.log(JSON.stringify(checkoutDTO));

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(checkoutDTO),
            });

            if (!response.ok) throw await response.json();

            const { sessionId }: { sessionId: string } = await response.json();

            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) throw error;
        } catch (error) {
            alert('An error occured while trying to redirect to checkout');
            console.error(error);
        }
    }

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={cartConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <Formik
                    initialValues={{ orderType: '', tel: '', email: '' }}
                    validationSchema={Yup.object().shape({
                        // @ts-expect-error yup
                        tel: Yup.string().phone('Invalid phone number').required('Required'),
                        email: Yup.string().email('Invalid email').required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        setSubmitting(false);
                        checkout(values.tel);
                    }}
                >
                    {({ values, isSubmitting, errors }) => (
                        <Form
                            css={css`
                                display: flex;
                                flex-direction: column;
                                color: black;
                                align-items: center;
                                justify-content: center;
                                height: 100%;
                                width: 100%;
                                .item {
                                    padding: 5px;
                                    display: flex;
                                    flex-direction: column;
                                    text-align: left;
                                    align-items: center;
                                    justify-content: center;
                                    width: 100%;
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
                                h4 {
                                    font-weight: 600;
                                    font-size: 1.1rem;
                                }
                                input {
                                    padding: 10px;
                                    border-radius: 5px;
                                    border: solid 1px #444;
                                }
                            `}
                        >
                            <div className="item">
                                <h4
                                    css={css`
                                        text-align: center;
                                    `}
                                >
                                    Order Type
                                </h4>
                                <div
                                    id="order-type-container"
                                    css={css`
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        flex-direction: row;
                                        input[type='radio'] {
                                            display: none;
                                        }
                                        input[type='radio']:checked {
                                            background-color: red;
                                        }
                                        label {
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            justify-content: center;
                                            padding: 10px;
                                            height: 100px;
                                            width: 100px;
                                            &:select {
                                                border: 1px solid black;
                                            }
                                        }
                                    `}
                                >
                                    <Field type="radio" name="orderType" />
                                    <label>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                            <path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm288 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
                                        </svg>
                                        Delivery
                                    </label>
                                    <Field type="radio" name="orderType" />
                                    <label>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 448 512"
                                        >
                                            {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                                            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 96c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24s-10.7 24-24 24zm200-24c0 13.3-10.7 24-24 24s-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24z" />
                                        </svg>
                                        Pickup
                                    </label>
                                </div>
                            </div>

                            <div className="item">
                                <h4>Phone Number</h4>
                                <Field name="tel" type="tel" />
                                <ErrorMessage name="tel" component="span" className="error" />
                            </div>

                            <div className="item">
                                <h4>Email</h4>
                                <Field name="email" type="email" />
                                <ErrorMessage name="email" component="span" className="error" />
                            </div>

                            <Button type="submit" primary={true} disabled={isSubmitting}>
                                Pay
                            </Button>
                        </Form>
                    )}
                </Formik>
            </WhiteSection>
        </>
    );
}

export const getServerSideProps = requiresStoreToBeEnabled(async ({ locale }) => {
    await connectToDatabase();

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'checkout'])),
            allProducts: JSON.parse(JSON.stringify(await Product.find({ archived: false }))),
        },
    };
});
