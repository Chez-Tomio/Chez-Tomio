/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, SpecialtiesGrid, Specialty, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { NextImageSection } from '../lib/components/common/NextImageSection';
import { connectToDatabase, ISerializedProduct, Product } from '../lib/database/mongo';

const { homeConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function Home({ specialities }: { specialities: ISerializedProduct[] }) {
    const router = useRouter();
    const { t } = useTranslation('home');

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={homeConfig.welcomeImage} size="fill">
                <h1>{t('welcome')}</h1>
                <h4>{t('welcomeSubtitle')}</h4>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                    `}
                >
                    <Link href="/menu">
                        <Button primary={true}>{t('seeMenu')}</Button>
                    </Link>
                    <Link href="/contact">
                        <Button>{t('contactUs')}</Button>
                    </Link>
                </div>
            </NextImageSection>

            <WhiteSection>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        div {
                            display: flex;
                            justify-content: center;
                        }
                        @media (max-width: 1000px) {
                            flex-wrap: wrap;
                        }
                    `}
                >
                    <div
                        css={css`
                            flex-direction: column;
                            flex: 66.66%;
                        `}
                    >
                        <h2>{t('ourRestaurant')}</h2>
                        <p>{t('restaurantDescription')}</p>
                    </div>
                    <div
                        css={css`
                            align-items: center;
                            margin: 30px;
                            flex: 33.33%;
                        `}
                    >
                        <img
                            src={homeConfig.ourRestaurantImage + '?webp'}
                            type="image/webp"
                            alt=""
                            css={css`
                                width: 100%;
                                max-width: 400px;
                            `}
                        />
                    </div>
                </div>
            </WhiteSection>

            {specialities.length > 0 && (
                <>
                    <NextImageSection imageUrl={homeConfig.specialtyImage} size="half">
                        <h2>{t('specialties')}!</h2>
                    </NextImageSection>

                    <WhiteSection>
                        <SpecialtiesGrid>
                            {specialities.map((s) => (
                                <Specialty
                                    key={s._id}
                                    imageUrl={s.image ?? ''}
                                    name={s.title[router.locale ?? 'fr']}
                                    description={s.description[router.locale ?? 'fr']}
                                />
                            ))}
                        </SpecialtiesGrid>
                    </WhiteSection>
                </>
            )}
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    await connectToDatabase();

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common', 'home'])),
            specialities: JSON.parse(
                JSON.stringify(await Product.find({ isSpecialty: true, archived: false })),
            ),
        },
    };
};
