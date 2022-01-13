/** @jsxRuntime classic */
/** @jsx jsx */
import '../lib/styles/popup.css';

import {
    Button,
    Footer,
    GlobalStyles,
    Header,
    HeaderSpace,
    Nav,
    NavCartButton,
    NavItem,
    NavWrapper,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { Provider } from 'next-auth/client';
import { appWithTranslation, useTranslation } from 'next-i18next';
import React, { useEffect, useReducer, useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';

import { NextImageSection } from '../lib/components/common/NextImageSection';
import GlobalState, { reducer, SET_CART_PRODUCTS } from '../lib/GlobalState';
import * as gtag from '../lib/gtag';

const { globalConfig } = getConfig().publicRuntimeConfig;

const defaultMenuItems = [
    {
        url: '/',
        translationKey: 'home',
    },
    {
        url: '/menu',
        translationKey: 'menu',
    },
    {
        url: '/a-propos',
        translationKey: 'about',
    },
    {
        url: '/galerie',
        translationKey: 'galery',
    },
    {
        url: '/contact',
        translationKey: 'contact',
    },
];

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');

    const initialState = {
        cartProducts: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const [cartProductsCount, setCartProductsCount] = useState(0);

    useEffect(() => {
        setCartProductsCount(0);
        state.cartProducts.map((cartProduct) => setCartProductsCount((i) => i + cartProduct.count));
    }, [state]);

    useEffect(() => {
        const localStorageProducts = localStorage.getItem('cartProducts');
        if (localStorageProducts) {
            const data = JSON.parse(localStorageProducts);
            dispatch({ type: SET_CART_PRODUCTS, payload: data });
        }
    }, []);

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            {/* Global Site Tag (gtag.ts) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <Script
                id="gtag-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
            <Provider session={pageProps.session}>
                <ToastProvider>
                    <GlobalState initialState={state} dispatch={dispatch}>
                        <GlobalStyles />
                        <NavWrapper>
                            <main
                                css={css`
                                    min-height: 100%;
                                    display: flex;
                                    flex-direction: column;
                                `}
                            >
                                <Head>
                                    <meta name="theme-color" content="#000" />
                                    <meta
                                        name="description"
                                        content="Chez Tomio vous offre une cuisine réinventée de type fusion asiatique. Nos produits sont frais, de haute qualité et surtout à un prix très abordable. Restaurant - Camion de rue - Traiteur"
                                    ></meta>
                                    {/* Open Graph */}
                                    <meta property="og:type" content="website" />
                                    <meta property="og:title" content="Chez Tomio" />
                                    <meta
                                        property="og:description"
                                        content="Chez Tomio vous offre une cuisine réinventée de type fusion asiatique. Nos produits sont frais, de haute qualité et surtout à un prix très abordable. Restaurant - Camion de rue - Traiteur"
                                    />
                                    <meta
                                        property="og:image"
                                        content="https://storage.cheztomio.com/chez-tomio/banner.jpg"
                                    />
                                    <meta property="og:url" content="https://cheztomio.com" />
                                    <meta property="og:site_name" content="Chez Tomio" />
                                    {/* Twitter */}
                                    <meta name="twitter:title" content="Chez Tomio" />
                                    <meta
                                        name="twitter:description"
                                        content="Chez Tomio vous offre une cuisine réinventée de type fusion asiatique. Nos produits sont frais, de haute qualité et surtout à un prix très abordable. Restaurant - Camion de rue - Traiteur"
                                    />
                                    <meta
                                        name="twitter:image"
                                        content="https://storage.cheztomio.com/chez-tomio/banner.jpg"
                                    />
                                </Head>
                                <Header backgroundFull={pageProps.headerBackgroundFull}>
                                    <Link href="/">
                                        <img
                                            src={globalConfig.app.logo}
                                            alt="logo"
                                            css={css`
                                                height: 85%;
                                                cursor: pointer;
                                                border-radius: 10px;
                                            `}
                                        />
                                    </Link>
                                    <HeaderSpace />
                                    <Nav>
                                        {[...defaultMenuItems, ...globalConfig.app.menuItems].map(
                                            ({ url, translationKey }, i) => (
                                                <Link href={url} key={i}>
                                                    <div>
                                                        <NavItem>{t(translationKey)}</NavItem>
                                                    </div>
                                                </Link>
                                            ),
                                        )}

                                        <Link
                                            href={router.asPath}
                                            locale={router.locale === 'fr' ? 'en' : 'fr'}
                                        >
                                            <div>
                                                <NavItem border={true}>
                                                    {t('changeLanguage')}
                                                </NavItem>
                                            </div>
                                        </Link>
                                    </Nav>

                                    {globalConfig.isStoreEnabled && (
                                        <div
                                            css={css`
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                margin-left: 15px;
                                            `}
                                        >
                                            <Link href="/panier">
                                                <div>
                                                    <NavCartButton
                                                        cartProductsCount={cartProductsCount}
                                                    />
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </Header>

                                <Page {...pageProps} />

                                {(pageProps.bottomBanner ?? true) && (
                                    <NextImageSection imageUrl={globalConfig.app.bottomBannerImage}>
                                        <h2>{t('eatWithUs')}</h2>
                                        <h4>{t('eatWithUsDescription')}</h4>
                                        <Link href="/contact">
                                            <Button primary={true}>{t('contactUs')}</Button>
                                        </Link>
                                        <div
                                            css={css`
                                                margin-top: 20px;
                                                display: flex;
                                                a {
                                                    color: white;
                                                }
                                                svg {
                                                    margin: 10px;
                                                    height: 2rem;
                                                    cursor: pointer;
                                                    transition: 0.3s;
                                                    &:hover {
                                                        color: #ed1b24;
                                                    }
                                                }
                                            `}
                                        >
                                            <a
                                                target="_blank"
                                                href="https://www.facebook.com/ChezTomio.ca/"
                                                rel="noreferrer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    className="bi bi-facebook"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                                </svg>
                                            </a>
                                            <a
                                                target="blank"
                                                href="https://www.instagram.com/chez_tomio/"
                                                rel="noreferrer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    className="bi bi-instagram"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </NextImageSection>
                                )}

                                <Footer
                                    leftText={`Copyright © 2022 ${globalConfig.app.restoName}`}
                                    rightText={t('rightsReserved')}
                                />
                            </main>
                        </NavWrapper>
                    </GlobalState>
                </ToastProvider>
            </Provider>
        </>
    );
}

export default appWithTranslation(App);
