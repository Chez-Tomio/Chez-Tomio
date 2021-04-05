/** @jsxRuntime classic */
/** @jsx jsx */
import { CategoriesGrid, Category, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function Menu() {
    const { t } = useTranslation('common');

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
                <h2>Categories</h2>
                <CategoriesGrid>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                    <Category imageUrl="/sample-image.jpg">Test</Category>
                </CategoriesGrid>
            </WhiteSection>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});
