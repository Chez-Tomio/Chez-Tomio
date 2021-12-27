/** @jsxRuntime classic */
/** @jsx jsx */
import { WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useContext } from 'react';
import Masonry from 'react-masonry-css';

import { ProductDTO } from '../../lib/api/dto/checkout';
import {
    GlobalDispatchContext,
    GlobalStateContext,
    SET_CART_ITEMS,
} from '../../lib/components/GlobalState';
import { MenuProduct } from '../../lib/components/menu/MenuProduct';
import { NextImageSection } from '../../lib/components/NextImageSection';
import {
    Category,
    connectToDatabase,
    ISerializedCategoryWithProducts,
} from '../../lib/database/mongo';

const { menuConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Menu({ category }: { category: ISerializedCategoryWithProducts }) {
    const { t } = useTranslation('menu');
    const router = useRouter();

    const globalState = useContext(GlobalStateContext);
    const dispatch = useContext(GlobalDispatchContext);

    function addToCart(data: ProductDTO) {
        const productsArray: ProductDTO[] = globalState.cartItems;

        console.log(productsArray);

        // If product is already in cart just add more to count
        // let productIsInCart = false;
        // productsArray.forEach((p, i) => {
        //     if (p.id === data.id) {
        //         productIsInCart = true;
        //         p.count += data.count;
        //     }
        // });
        // if (!productIsInCart) {
        //     productsArray.push(data);
        // }

        productsArray.push(data);

        dispatch({ type: SET_CART_ITEMS, payload: productsArray });
        localStorage.setItem('cartProducts', JSON.stringify(productsArray));
    }

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={menuConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

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
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
    await connectToDatabase();

    const { categorySlug } = query as { categorySlug: string };
    const category = await Category.findOne({ slug: categorySlug, archived: false }).populate({
        path: 'products',
        match: {
            archived: false,
        },
    });

    if (!category) return { notFound: true };

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'menu'])),
            category: JSON.parse(JSON.stringify(category)),
        },
    };
};
