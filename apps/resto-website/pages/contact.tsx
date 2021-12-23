/** @jsxRuntime classic */
/** @jsx jsx */
import { WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { NextImageSection } from '../lib/components/NextImageSection';

const { contactConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Contact() {
    const { t } = useTranslation('contact');

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={contactConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        & > div {
                            display: flex;
                            justify-content: center;
                        }
                        @media (max-width: 1000px) {
                            flex-wrap: wrap;
                        }
                    `}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.7057719496956!2d-73.58343778376798!3d45.53612613666118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bbc18cc5987%3A0x7f11133703213e73!2sChez%20Tomio!5e0!3m2!1sen!2sca!4v1640235636590!5m2!1sen!2sca"
                        width="600"
                        height="450"
                        css={css`
                            border: 0;
                            margin: 5px;
                            max-width: 90%;
                        `}
                        allowFullScreen={true}
                        loading="lazy"
                    ></iframe>

                    <div
                        css={css`
                            flex-direction: column;
                            flex: 50%;
                            margin-left: 5%;
                        `}
                    >
                        <p>{t('descriptionParagraph1')}</p>
                        <p>{t('descriptionParagraph2')}</p>

                        <div
                            css={css`
                                display: flex;
                                align-items: center;
                                padding: 10px;
                            `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-geo-alt-fill"
                                viewBox="0 0 16 16"
                                css={css`
                                    color: #ed1b24;
                                    height: 25px;
                                    width: 25px;
                                    margin-right: 10px;
                                `}
                            >
                                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                            </svg>
                            5161 Av. Papineau, Montréal, QC H2H 1W1
                        </div>
                        <div
                            css={css`
                                display: flex;
                                align-items: center;
                                padding: 10px;
                            `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-telephone-fill"
                                viewBox="0 0 16 16"
                                css={css`
                                    color: #ed1b24;
                                    height: 25px;
                                    width: 25px;
                                    margin-right: 10px;
                                `}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                                />
                            </svg>
                            (514) 508-8898
                        </div>
                        <div
                            css={css`
                                display: flex;
                                align-items: center;
                                padding: 10px;
                            `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-envelope-fill"
                                viewBox="0 0 16 16"
                                css={css`
                                    color: #ed1b24;
                                    height: 25px;
                                    width: 25px;
                                    margin-right: 10px;
                                `}
                            >
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                            </svg>
                            long.chiem@tomiosushi.com
                        </div>
                    </div>
                    {/* <div
                        css={css`
                            flex-direction: column;
                            flex: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `}
                    >

                    </div> */}
                </div>
            </WhiteSection>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'contact'])),
    },
});
