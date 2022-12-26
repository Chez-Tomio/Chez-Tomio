/** @jsxRuntime classic */
/** @jsx jsx */

import { Button, CartProduct, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { round } from 'lodash';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useContext, useEffect, useState } from 'react';
import * as Yup from 'yup';

import { ProductDTO, ProductDTOWithMetadata } from '../lib/api/dto/checkout';
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

export default function Cart({ allProducts }: { allProducts: ISerializedProduct[] }) {
    const router = useRouter();
    const { t } = useTranslation('cart');
    const [productDTOArray, setProductDTOArray] = useState<ProductDTO[]>([]);
    const [productArray, setProductArray] = useState<ProductDTOWithMetadata[]>([]);
    const [productCount, setProductCount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [tps, setTps] = useState(0);
    const [tvq, setTvq] = useState(0);

    const globalState = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);

    useEffect(() => {
        const productsInState = globalState.cartProducts
            .map((productDTO: ProductDTO) => {
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
                        (e): e is ProductDTOWithMetadata['extras'][number] => e.count !== undefined,
                    );
                product.count = productDTO.count;
                product.id = productDTO.id;
                return product;
            })
            .filter((p): p is ProductDTOWithMetadata => p !== undefined);

        setProductArray(productsInState);

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

        // Set productsCount
        let count = 0;
        globalState.cartProducts.forEach((p) => {
            count += p.count;
        });
        setProductCount(count);
    }, [globalState.cartProducts]);

    useEffect(() => {
        setSubtotal(productArray.reduce((acc, curr) => acc + getTotalProductPrice(curr), 0));
        setTps(
            productArray.reduce(
                (acc, curr) =>
                    acc +
                    curr.count *
                        (round(curr.basePrice * (globalConfig.tpsRate / 100), 2) +
                            curr.extras.reduce(
                                (acc, curr) =>
                                    acc +
                                    curr.count *
                                        round(curr.price * (globalConfig.tpsRate / 100), 2),
                                0,
                            )),
                0,
            ),
        );
        setTvq(
            productArray.reduce(
                (acc, curr) =>
                    acc +
                    curr.count *
                        (round(curr.basePrice * (globalConfig.tvqRate / 100), 2) +
                            curr.extras.reduce(
                                (acc, curr) =>
                                    acc +
                                    curr.count *
                                        round(curr.price * (globalConfig.tvqRate / 100), 2),
                                0,
                            )),
                0,
            ),
        );
    }, [productArray]);

    function removeProduct(id: string) {
        const productDTOArrayWithoutRemovedProduct: ProductDTO[] = globalState.cartProducts.filter(
            (e) => e.id !== id,
        );
        // setProductDTOArray(productDTOArrayWithoutRemovedProduct);
        dispatch({ type: SET_CART_PRODUCTS, payload: productDTOArrayWithoutRemovedProduct });
        localStorage.setItem('cartProducts', JSON.stringify(productDTOArrayWithoutRemovedProduct));
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
                <div
                    css={css`
                        display: flex;
                        width: 100%;
                        .cart-total {
                            width: 30%;
                            margin-left: 30px;
                        }
                        @media (max-width: 1000px) {
                            flex-direction: column;
                            .cart-total {
                                width: 100%;
                                margin-left: 0;
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
                                <Link href="/menu" passHref>
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

                    <div
                        className="cart-total"
                        css={css`
                            display: flex;
                            flex-direction: column;
                            padding: 20px;
                            min-width: 350px;
                            .summaryItem {
                                display: flex;
                                padding: 5px 0;
                                *:first-of-type {
                                    flex: 1;
                                }
                            }
                        `}
                    >
                        <h3
                            css={css`
                                margin-bottom: 20px;
                            `}
                        >
                            {t('orderSummary')}
                        </h3>
                        <div className="summaryItem">
                            <span>{t('subtotal')}</span>
                            <span>{toPrice(subtotal)}</span>
                        </div>
                        <div className="summaryItem">
                            <span>TPS (5%)</span>
                            <span>{toPrice(tps)}</span>
                        </div>
                        <div className="summaryItem">
                            <span>TVQ (9.975%)</span>
                            <span>{toPrice(tvq)}</span>
                        </div>
                        <hr />
                        <div className="summaryItem">
                            <span>{t('total')}</span>
                            <span>{toPrice(tps + tvq + subtotal)}</span>
                        </div>
                        <div
                            css={css`
                                margin-top: 20px;
                                width: 100%;
                                button {
                                    width: fill-available;
                                }
                            `}
                        >
                            <Link href="/checkout" passHref>
                                <Button primary={true} disabled={subtotal <= 0}>
                                    {t('checkout')}
                                </Button>
                            </Link>
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
