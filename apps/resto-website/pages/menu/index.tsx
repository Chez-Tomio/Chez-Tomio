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

import { NextImageSection } from '../../lib/components/common/NextImageSection';
import { Category, connectToDatabase, ISerializedCategory } from '../../lib/database/mongo';

const { globalConfig } = getConfig().publicRuntimeConfig;
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
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.locologin.com/api/fb/508dz"
                    css={css`
                        text-decoration: none;
                    `}
                >
                    <Button primary={true}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            className="bi bi-bag-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
                        </svg>
                        {t('orderDelivery')}
                    </Button>
                </a>

                {/* <p>
                    Après de nombreux commentaires donnés par nos clients, nous travaillons pour
                    mettre en place la commande en ligne directement sur notre site Web. Pendant ce
                    temps, nous vous invitons à commander via les autres applications de livraison
                    comme Doordash, UberEats ou Skip. Vous pouvez également nous appeler pour placer
                    une commande pour venir chercher. Nous sommes sincèrement désolés pour
                    l'inconvénient. Merci de votre compréhension.
                </p>

                <p>
                    After some feedback given by our customers, we are working to set up online
                    ordering directly on our website. During this time, we invite you to order
                    through the other delivery applications like Doordash, UberEats or Skip. You can
                    also call us to place an order for pick up. We are sincerely sorry for the
                    inconvenience. Thank you for your understanding.
                </p> */}

                {globalConfig.isStoreEnabled && (
                    <>
                        <hr />

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
                    </>
                )}

                <hr />

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                    `}
                >
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://storage.cheztomio.com/chez-tomio/menu-restaurant.pdf"
                        css={css`
                            text-decoration: none;
                        `}
                    >
                        <Button primary={true}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-file-earmark-pdf"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                            </svg>
                            {t('seeKitchenMenu')}
                        </Button>
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://storage.cheztomio.com/chez-tomio/sushi-list.pdf"
                        css={css`
                            text-decoration: none;
                        `}
                    >
                        <Button primary={true}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="bi bi-file-earmark-pdf"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                <path d="M4.603 14.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.697 19.697 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.712 5.712 0 0 1-.911-.95 11.651 11.651 0 0 0-1.997.406 11.307 11.307 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.266.266 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.71 12.71 0 0 1 1.01-.193 11.744 11.744 0 0 1-.51-.858 20.801 20.801 0 0 1-.5 1.05zm2.446.45c.15.163.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.876 3.876 0 0 0-.612-.053zM8.078 7.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                            </svg>
                            {t('seeSushiList')}
                        </Button>
                    </a>
                </div>
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
