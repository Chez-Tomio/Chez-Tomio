/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { round } from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import * as Yup from 'yup';

import { taxRate } from '../config.json';
import { stripePublicKey } from '../config.json';
import { CheckoutDTO, ProductDTO, ProductDTOWithMetadata } from '../lib/api/dto/checkout';
import { getTotalProductPrice } from '../lib/client/utils';
import { connectToDatabase, ISerializedProduct, Product } from '../lib/database/mongo';
import { requiresStoreToBeEnabled } from '../lib/server/utils';

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

export default function Cart({ allProducts }: { allProducts: ISerializedProduct[] }) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [productDTOArray, setProductDTOArray] = useState<ProductDTO[]>([]);
    const [productArray, setProductArray] = useState<ProductDTOWithMetadata[]>([]);
    const [productCount, setProductCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [phoneNumberPopup, setPhoneNumberPopup] = useState(false);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();

    useEffect(() => {
        // Set productsArray
        const localStorageProducts = localStorage.getItem('cartProducts');
        const data = (localStorageProducts ? JSON.parse(localStorageProducts) : [])
            .map((productDTO: ProductDTO) => {
                const product = allProducts.find((p) => p._id === productDTO.id);
                if (!product) return undefined;
                productDTO.extras = productDTO.extras.filter((extraDTO) =>
                    product.extras.find((e) => e._id === extraDTO.id),
                );
                return productDTO;
            })
            .filter((p: ProductDTO | undefined) => p !== undefined);
        setProductDTOArray(data);

        // Start loading Stripe
        setStripePromise(loadStripe(stripePublicKey));
    }, []);

    useEffect(() => {
        // Set productsCount
        let count = 0;
        productDTOArray.forEach((p) => {
            count += p.count;
        });
        setProductCount(count);

        setProductArray(
            productDTOArray
                .map((productDTO) => {
                    const product = allProducts.find(
                        (productMetadata) => productMetadata._id === productDTO.id,
                    ) as ProductDTOWithMetadata | undefined;
                    if (!product) return undefined;
                    product.extras = product.extras
                        .map((extraMetadata: ProductDTOWithMetadata['extras'][number]) => ({
                            ...extraMetadata,
                            count: productDTO.extras.find(
                                (extraDTO) => extraDTO.id === extraMetadata._id,
                            )?.count,
                        }))
                        .filter(
                            (e): e is ProductDTOWithMetadata['extras'][number] =>
                                e.count !== undefined,
                        );
                    product.count = productDTO.count;
                    product.id = productDTO.id;
                    return product;
                })
                .filter((p): p is ProductDTOWithMetadata => p !== undefined),
        );
    }, [productDTOArray]);

    useEffect(() => {
        setSubtotal(productArray.reduce((acc, curr) => acc + getTotalProductPrice(curr), 0));
        setTaxes(
            productArray.reduce(
                (acc, curr) =>
                    acc +
                    curr.count *
                        (round(curr.basePrice * (taxRate / 100), 2) +
                            curr.extras.reduce(
                                (acc, curr) =>
                                    acc + curr.count * round(curr.price * (taxRate / 100), 2),
                                0,
                            )),
                0,
            ),
        );
    }, [productArray]);

    function removeProduct(id: string) {
        const productDTOArrayWithoutRemovedProduct: ProductDTO[] = productDTOArray.filter(
            (e) => e.id !== id,
        );
        setProductDTOArray(productDTOArrayWithoutRemovedProduct);
        localStorage.setItem('cartProducts', JSON.stringify(productDTOArrayWithoutRemovedProduct));
    }

    async function checkout(contactPhoneNumber: string) {
        try {
            const stripe = await stripePromise;
            if (!stripe) throw 'Stripe could not be loaded';
            const checkoutDTO: CheckoutDTO = {
                contactPhoneNumber,
                products: productDTOArray,
            };

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
                <title>Cart - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Popup
                open={phoneNumberPopup}
                closeOnDocumentClick
                onClose={() => setPhoneNumberPopup(false)}
            >
                <Formik
                    initialValues={{ tel: '' }}
                    validationSchema={Yup.object().shape({
                        // @ts-expect-error yup
                        tel: Yup.string().phone('Invalid phone number').required('Required'),
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
                                .item {
                                    padding: 5px;
                                    display: flex;
                                    flex-direction: column;
                                    text-align: left;
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
                                <h3>Phone Number</h3>
                                <Field name="tel" type="tel" />
                                <ErrorMessage name="tel" component="span" className="error" />
                            </div>

                            <Button type="submit" primary={true} disabled={isSubmitting}>
                                Next
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Popup>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>Cart</h1>
            </ImageSection>

            <WhiteSection>
                <div
                    css={css`
                        display: flex;
                        width: 100%;
                    `}
                >
                    <div
                        className="cart-products"
                        css={css`
                            display: flex;
                            flex-direction: column;
                            flex: 1;
                            padding: 20px;
                        `}
                    >
                        <div
                            css={css`
                                display: flex;
                                width: 100%;
                                align-items: center;
                                margin-bottom: 20px;
                            `}
                        >
                            <h3>Shopping Cart</h3>
                            <h4
                                css={css`
                                    margin-left: auto;
                                `}
                            >
                                {productCount + ' '}
                                Items
                            </h4>
                        </div>
                        {productArray.map((p) => (
                            <div
                                key={p.id}
                                className="cart-product"
                                css={css`
                                    display: flex;
                                    padding: 20px;
                                    border-top: #f0f0f0 solid 2px;
                                `}
                            >
                                <div>
                                    <img
                                        src={p.image}
                                        css={css`
                                            height: 100px;
                                        `}
                                    />
                                </div>
                                <div
                                    css={css`
                                        display: flex;
                                        flex-direction: column;
                                        margin-left: 10px;
                                        flex: 1;
                                    `}
                                >
                                    <div
                                        css={css`
                                            display: flex;
                                        `}
                                    >
                                        <h4
                                            css={css`
                                                font-weight: bold;
                                                margin: 0;
                                            `}
                                        >
                                            {p.title[router.locale ?? 'fr']}{' '}
                                            {p.extras.length > 0 && (
                                                <>
                                                    {' '}
                                                    (
                                                    {p.extras
                                                        .map(
                                                            (e) =>
                                                                `${
                                                                    e.title[router.locale ?? 'fr']
                                                                } x${e.count}`,
                                                        )
                                                        .join(', ')}
                                                    )
                                                </>
                                            )}
                                        </h4>
                                        <h4
                                            css={css`
                                                margin: 0;
                                                margin-left: auto;
                                            `}
                                        >
                                            ${getTotalProductPrice(p)}
                                        </h4>
                                    </div>
                                    <p
                                        css={css`
                                            margin: 0;
                                            margin-bottom: 10px;
                                            color: gray;
                                        `}
                                    >
                                        {p.count} &times; ${getTotalProductPrice(p) / p.count}
                                    </p>
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            onClick={() => removeProduct(p.id)}
                                            css={css`
                                                height: 25px;
                                                color: #ed1b24;
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
                            </div>
                        ))}
                    </div>
                    <div
                        className="cart-total"
                        css={css`
                            width: 25%;
                        `}
                    >
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                background-color: #f0f0f0;
                                padding: 20px;
                                border-radius: 20px;
                            `}
                        >
                            <h3>Order Summary</h3>
                            <h4>Subtotal</h4>${subtotal}
                            <h4>Taxes (TPS &#38; TVQ)</h4>${taxes}
                            <h4
                                css={css`
                                    font-weight: bold;
                                `}
                            >
                                Total
                            </h4>
                            ${taxes + subtotal}
                            <Button
                                primary={true}
                                disabled={subtotal <= 0}
                                onClick={setPhoneNumberPopup.bind(undefined, true)}
                            >
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </WhiteSection>

            <ImageSection imageUrl="/sample-image-2.jpg">
                <h2>Venez manger avec nous!</h2>
                <h4>On vous servira avec grand plaisir! On espère vous voir bientôt!</h4>
                <Link href="/contact">
                    <Button primary={true}>Nous contacter!</Button>
                </Link>
            </ImageSection>
        </>
    );
}

export const getServerSideProps = requiresStoreToBeEnabled(async ({ locale }) => {
    await connectToDatabase();

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            allProducts: JSON.parse(JSON.stringify(await Product.find())),
        },
    };
});
