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
// import {} from '../lib/components/common/GlobalStateProvider';
import { NextImageSection } from '../lib/components/common/NextImageSection';
import { connectToDatabase, ISerializedProduct, Product } from '../lib/database/mongo';
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

export default function Cart({ allProducts }: { allProducts: ISerializedProduct[] }) {
    const router = useRouter();
    const { t } = useTranslation('cart');
    const [productDTOArray, setProductDTOArray] = useState<ProductDTO[]>([]);
    const [productArray, setProductArray] = useState<ProductDTOWithMetadata[]>([]);
    const [productCount, setProductCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [phoneNumberPopup, setPhoneNumberPopup] = useState(false);
    const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>();

    // const globalState = useContext(GlobalStateContext);
    // const dispatch = useContext(GlobalDispatchContext);

    // useEffect(() => {
    //     // const localStorageProducts = localStorage.getItem('cartProducts');

    //     // console.log(localStorageProducts);
    //     const data = globalState.cartItems
    //         .map((productDTO: ProductDTO) => {
    //             const product = allProducts.find((p) => p._id === productDTO.id);
    //             if (!product) return undefined;
    //             productDTO.extras = productDTO.extras.filter((extraDTO) =>
    //                 product.extras.find((e) => e._id === extraDTO.id),
    //             );
    //             return productDTO;
    //         })
    //         .filter((p: ProductDTO | undefined) => p !== undefined);

    //     console.log(globalState.cartItems);
    //     setProductDTOArray(data);

    //     // const data = (globalState.cartItems ? JSON.parse(globalState.cartItems) : [])
    //     //     .map((productDTO: ProductDTO) => {
    //     //         const product = allProducts.find((p) => p._id === productDTO.id);
    //     //         if (!product) return undefined;
    //     //         productDTO.extras = productDTO.extras.filter((extraDTO) =>
    //     //             product.extras.find((e) => e._id === extraDTO.id),
    //     //         );
    //     //         return productDTO;
    //     //     })
    //     //     .filter((p: ProductDTO | undefined) => p !== undefined);
    //     // setProductDTOArray(data);

    //     // Start loading Stripe
    //     setStripePromise(loadStripe(globalConfig.stripePublicKey));
    // }, []);

    // useEffect(() => {
    //     // Set productsCount
    //     let count = 0;
    //     productDTOArray.forEach((p) => {
    //         count += p.count;
    //     });
    //     setProductCount(count);

    //     setProductArray(
    //         globalState.cartItems
    //             .map((productDTO) => {
    //                 const product = allProducts.find(
    //                     (productMetadata) => productMetadata._id === productDTO.id,
    //                 ) as ProductDTOWithMetadata | undefined;
    //                 if (!product) return undefined;
    //                 product.extras = product.extras
    //                     .map((extraMetadata: ProductDTOWithMetadata['extras'][number]) => ({
    //                         ...extraMetadata,
    //                         count: productDTO.extras.find(
    //                             (extraDTO) => extraDTO.id === extraMetadata._id,
    //                         )?.count,
    //                     }))
    //                     .filter(
    //                         (e): e is ProductDTOWithMetadata['extras'][number] =>
    //                             e.count !== undefined,
    //                     );
    //                 product.count = productDTO.count;
    //                 product.id = productDTO.id;
    //                 return product;
    //             })
    //             .filter((p): p is ProductDTOWithMetadata => p !== undefined),
    //     );
    // }, [globalState.cartItems]);

    // useEffect(() => {
    //     setSubtotal(productArray.reduce((acc, curr) => acc + getTotalProductPrice(curr), 0));
    //     setTaxes(
    //         productArray.reduce(
    //             (acc, curr) =>
    //                 acc +
    //                 curr.count *
    //                     (round(curr.basePrice * (globalConfig.taxRate / 100), 2) +
    //                         curr.extras.reduce(
    //                             (acc, curr) =>
    //                                 acc +
    //                                 curr.count *
    //                                     round(curr.price * (globalConfig.taxRate / 100), 2),
    //                             0,
    //                         )),
    //             0,
    //         ),
    //     );
    // }, [productArray]);

    // function removeProduct(id: string) {
    //     const productDTOArrayWithoutRemovedProduct: ProductDTO[] = globalState.cartItems.filter(
    //         (e) => e.id !== id,
    //     );
    //     // setProductDTOArray(productDTOArrayWithoutRemovedProduct);
    //     dispatch({ type: SET_CART_PRODUCTS, payload: productDTOArrayWithoutRemovedProduct });
    //     localStorage.setItem('cartProducts', JSON.stringify(productDTOArrayWithoutRemovedProduct));
    // }

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

            <NextImageSection imageUrl={cartConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <div
                    css={css`
                        display: flex;
                        width: 100%;
                        .cart-total {
                            width: 25%;
                        }
                        @media (max-width: 1000px) {
                            flex-direction: column;
                            .cart-total {
                                width: 100%;
                            }
                        }
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
                            <h3>{t('shoppingCart')}</h3>
                            <h4
                                css={css`
                                    margin-left: auto;
                                `}
                            >
                                {productCount + ' '}
                                {t('items')}
                            </h4>
                        </div>
                        {productArray.length === 0 && (
                            <div>
                                <p>{t('cartEmpty')}</p>
                                <Link href="/menu">
                                    <Button
                                        primary={true}
                                        noMargin={true}
                                        css={css`
                                            margin: 0;
                                        `}
                                    >
                                        {t('continueShopping')}
                                    </Button>
                                </Link>
                            </div>
                        )}
                        {productArray.map((p) => (
                            <CartProduct
                                key={p.id}
                                title={p.title[router.locale ?? 'fr']}
                                image={p.image}
                                quantity={p.count}
                                price={toPrice(getTotalProductPrice(p))}
                                extras={p.extras
                                    .map((e) => `${e.title[router.locale ?? 'fr']} x ${e.count}`)
                                    .join(', ')}
                                remove={() => removeProduct(p.id)}
                            ></CartProduct>
                        ))}
                    </div>

                    <div className="cart-total">
                        <div
                            css={css`
                                display: flex;
                                flex-direction: column;
                                background-color: #f7f7f7;
                                padding: 20px;
                                border-radius: 20px;
                            `}
                        >
                            <h3>{t('orderSummary')}</h3>
                            <h4>{t('subtotal')}</h4>
                            {toPrice(subtotal)}
                            <h4>{t('taxes')} (TPS &#38; TVQ)</h4>
                            {toPrice(taxes)}
                            <h4
                                css={css`
                                    font-weight: bold;
                                `}
                            >
                                {t('total')}
                            </h4>
                            {toPrice(taxes + subtotal)}
                            <Button
                                primary={true}
                                disabled={subtotal <= 0}
                                onClick={setPhoneNumberPopup.bind(undefined, true)}
                            >
                                {t('checkout')}
                            </Button>
                        </div>
                    </div>
                </div>
            </WhiteSection>
        </>
    );
}

export const getServerSideProps = requiresStoreToBeEnabled(async ({ locale }) => {
    await connectToDatabase();

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'cart'])),
            allProducts: JSON.parse(JSON.stringify(await Product.find({ archived: false }))),
        },
    };
});
