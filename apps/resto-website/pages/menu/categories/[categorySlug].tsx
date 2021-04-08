/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, ProductTile, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import {
    Category,
    connectToDatabase,
    ISerializedCategoryWithProducts,
} from '../../../lib/database/mongo';

export default function Menu({ category }: { category?: ISerializedCategoryWithProducts }) {
    const { t } = useTranslation('common');
    const router = useRouter();

    if (!category) return <ErrorPage statusCode={404} />;

    return (
        <>
            <Head>
                <title>Menu - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>{category.title[router.locale ?? 'fr']}</h1>
                <h4>Cuisine fusion asiatique!</h4>
            </ImageSection>

            <WhiteSection>
                <h2>Products</h2>
                <div>
                    <ProductTile
                        imageUrl="/sample-image.jpg"
                        title="Test"
                        description="Test"
                        price={1}
                        onClickAdd={() => console.log('Ok')}
                    >
                        Product
                    </ProductTile>
                    <ProductTile
                        imageUrl="/sample-image.jpg"
                        title="Test"
                        description="Test"
                        price={1}
                        onClickAdd={() => console.log('Ok')}
                    >
                        Product
                    </ProductTile>
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
