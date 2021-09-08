/** @jsxRuntime classic */
/** @jsx jsx */
import {
    CategoriesGrid,
    CategoryTile,
    ImageSection,
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
import React from 'react';

import { Category, connectToDatabase, ISerializedCategory } from '../../lib/database/mongo';

const { menuConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Menu({ categories }: { categories: ISerializedCategory[] }) {
    const router = useRouter();
    const { t } = useTranslation('menu');

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl={menuConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </ImageSection>

            <WhiteSection>
                <CategoriesGrid>
                    {categories.map((c) => (
                        <Link href={`/menu/${c.slug}`} key={c._id}>
                            <div>
                                <CategoryTile imageUrl={c.image}>
                                    {c.title[router.locale ?? 'fr']}
                                </CategoryTile>
                            </div>
                        </Link>
                    ))}
                </CategoriesGrid>
            </WhiteSection>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    await connectToDatabase();
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'menu'])),
            categories: JSON.parse(JSON.stringify(await Category.find({ archived: false }))),
        },
    };
};
