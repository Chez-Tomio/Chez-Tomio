/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, CategoriesGrid, CategoryTile, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { NextImageSection } from '../../lib/components/NextImageSection';
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

            <NextImageSection imageUrl={menuConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

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
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                    `}
                >
                    <a target="_blank" href="/menu-principal.pdf">
                        <Button primary={true}>{t('seeKitchenMenu')}</Button>
                    </a>
                    <a target="_blank" href="/sushi-list.pdf">
                        <Button primary={true}>{t('seeSushiList')}</Button>
                    </a>
                </div>
                <p>
                    Veuillez noter que nous sommes encore en pré-ouverture et que les menus peuvent
                    changer.
                </p>
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
