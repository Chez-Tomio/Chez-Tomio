/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Masonry from 'react-masonry-css';

import { ProductDTO } from '../../../lib/api/dto/checkout';
import { MenuProduct } from '../../../lib/components/menu/MenuProduct';
import {
    Category,
    connectToDatabase,
    ISerializedCategoryWithProducts,
} from '../../../lib/database/mongo';

export default function Menu({ category }: { category?: ISerializedCategoryWithProducts }) {
    const { t } = useTranslation('common');
    const router = useRouter();

    function addToCart(data: ProductDTO) {
        let productsArray: ProductDTO[] = [];
        const localStorageProducts = localStorage.getItem('cartProducts');
        if (localStorageProducts) {
            const data = JSON.parse(localStorageProducts);
            productsArray = data;
        }

        // If product is already in cart just add more to count
        let productIsInCart = false;
        productsArray.forEach((p, i) => {
            if (p.id === data.id) {
                productIsInCart = true;
                p.count += data.count;
            }
        });
        if (!productIsInCart) {
            productsArray.push(data);
        }

        localStorage.setItem('cartProducts', JSON.stringify(productsArray));
    }

    if (!category) return <ErrorPage statusCode={404} />;

    return (
        <>
            <Head>
                <title>Menu - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>Menu</h1>
                <h4>Cuisine fusion asiatique!</h4>
            </ImageSection>

            <WhiteSection>
                <div
                    css={css`
                        width: 100%;
                    `}
                >
                    <h2>{category.title[router.locale ?? 'fr']}</h2>
                    <div
                        css={css`
                            width: 100%;
                            .my-masonry-grid {
                                display: flex;
                            }
                        `}
                    >
                        <Masonry
                            breakpointCols={{
                                default: 3,
                                1200: 2,
                                800: 1,
                            }}
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {category?.products.map((p) => (
                                <MenuProduct
                                    key={p._id}
                                    product={p}
                                    onAddToCart={(formData) => addToCart(formData)}
                                />
                            ))}
                        </Masonry>
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
export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
    await connectToDatabase();

    const { categorySlug } = query as { categorySlug: string };
    const category = await Category.findOne({ slug: categorySlug }).populate('products');

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            category: JSON.parse(JSON.stringify(category)),
        },
    };
};
