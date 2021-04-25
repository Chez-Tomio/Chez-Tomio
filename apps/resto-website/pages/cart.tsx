/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';

import { ProductDTO } from '../lib/api/dto/checkout';
import { IProduct } from '../lib/database/mongo';

export default function Cart() {
    const { t } = useTranslation('common');
    const [productArray, setProductArray] = useState<IProduct[]>([]);
    const [productDTOArray, setProductDTOArray] = useState<ProductDTO[]>([]);
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        // Set productsArray
        const localStorageProducts = localStorage.getItem('cartProducts');
        const data = localStorageProducts ? JSON.parse(localStorageProducts) : [];
        setProductDTOArray(data);
        console.log(productDTOArray);
    }, []);

    useEffect(() => {
        // Set productsCount
        let count = 0;
        productDTOArray.forEach((p) => {
            count += p.count;
        });
        setProductCount(count);
    }, [productDTOArray]);

    function removeProduct(id: string) {
        const productDTOArrayWithRemovedProduct: ProductDTO[] = productDTOArray.filter(
            (e) => e.id !== id,
        );
        setProductDTOArray(productDTOArrayWithRemovedProduct);
        localStorage.setItem('cartProducts', JSON.stringify(productDTOArrayWithRemovedProduct));
    }

    return (
        <>
            <Head>
                <title>Cart - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                        {productDTOArray.map((p, i) => (
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
                                        src="/sample-image.jpg"
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
                                            Title
                                        </h4>
                                        <h4
                                            css={css`
                                                margin: 0;
                                                margin-left: auto;
                                            `}
                                        >
                                            $9.80
                                        </h4>
                                    </div>
                                    <p
                                        css={css`
                                            margin: 0;
                                            margin-bottom: 10px;
                                            color: gray;
                                        `}
                                    >
                                        {p.count} &times; $0.00
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
                            <h4>Subtotal</h4>
                            <h4>Taxes</h4>
                            <h4
                                css={css`
                                    font-weight: bold;
                                `}
                            >
                                Total
                            </h4>
                            <Button primary={true}>Checkout</Button>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
    },
});
