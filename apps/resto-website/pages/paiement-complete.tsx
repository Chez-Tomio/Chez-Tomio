/** @jsxRuntime classic */
/** @jsx jsx */
import { WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import getConfig from 'next/config';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';

import { NextImageSection } from '../lib/components/common/NextImageSection';
import { requiresStoreToBeEnabled } from '../lib/utils/server';

const { paymentCompleteConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Galerie() {
    const { t } = useTranslation('paymentComplete');

    useEffect(() => {
        localStorage.clear();
    }, []);

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={paymentCompleteConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <div
                    css={css`
                        padding: 50px 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    `}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        css={css`
                            color: #0ec663;
                            height: 100px;
                            margin-bottom: 20px;
                        `}
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                    </svg>
                    <h4
                        css={css`
                            text-align: center;
                            max-width: 1000px;
                        `}
                    >
                        {t('instructions')}
                    </h4>
                </div>
            </WhiteSection>
        </>
    );
}

export const getServerSideProps = requiresStoreToBeEnabled(async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'paymentComplete'])),
    },
}));
