/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { NextImageSection } from '../lib/components/NextImageSection';

const { galeryConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Galerie() {
    const { t } = useTranslation('galery');

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={galeryConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <h2
                    css={css`
                        margin: 100px 0;
                    `}
                >
                    À venir... / Coming soon...
                </h2>
            </WhiteSection>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'galery'])),
    },
});
