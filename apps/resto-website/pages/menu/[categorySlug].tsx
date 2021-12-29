/** @jsxRuntime classic */
/** @jsx jsx */
import {
    CategoriesSlider,
    CategoriesSliderItem,
    ProductsGrid,
    WhiteSection,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useContext } from 'react';

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
    ISerializedCategory,
    ISerializedCategoryWithProducts,
} from '../../lib/database/mongo';

const { menuConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Menu({
    categories,
    category,
}: {
    categories: ISerializedCategory[];
    category: ISerializedCategoryWithProducts;
}) {
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
                    {/* <h2>{category.title[router.locale ?? 'fr']}</h2> */}
                    <CategoriesSlider>
                        {categories.map((c) => (
                            <Link href={`/menu/${c.slug}`} key={c._id}>
                                <CategoriesSliderItem
                                    active={router.asPath == `/menu/${c.slug}` ? true : false}
                                >
                                    {c.title[router.locale ?? 'fr']}
                                </CategoriesSliderItem>
                            </Link>
                        ))}
                    </CategoriesSlider>
                    <ProductsGrid>
                        {category?.products.map((p) => (
                            <MenuProduct
                                key={p._id}
                                product={p}
                                onAddToCart={(formData) => addToCart(formData)}
                            />
                        ))}
                    </ProductsGrid>
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
            categories: JSON.parse(JSON.stringify(await Category.find({ archived: false }))),
            category: JSON.parse(JSON.stringify(category)),
        },
    };
};
