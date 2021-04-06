/** @jsxRuntime classic */
/** @jsx jsx */
import {
    Button,
    CategoriesGrid,
    Category,
    ImageSection,
    WhiteSection,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
