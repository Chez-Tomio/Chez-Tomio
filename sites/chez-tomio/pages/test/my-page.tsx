/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function Test() {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>Test - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>Galerie</h1>
            </ImageSection>

            <WhiteSection>
                <h2>Galerie</h2>
            </WhiteSection>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
    },
});
