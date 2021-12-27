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
    NavItem,
    NavWrapper,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { AppProps } from 'next/app';
import getConfig from 'next/config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { appWithTranslation, useTranslation } from 'next-i18next';
import React, { useEffect, useReducer, useState } from 'react';
import { ToastProvider } from 'react-toast-notifications';

import { CartIcon } from '../lib/components/CartIcon';
import GlobalState, { reducer, SET_CART_ITEMS } from '../lib/components/GlobalState';
import { NextImageSection } from '../lib/components/NextImageSection';

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
        cartItems: [],
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(0);
        state.cartItems.map((cartItem) => setCartItemCount((i) => i + cartItem.count));
    }, [state]);

    useEffect(() => {
        const localStorageProducts = localStorage.getItem('cartProducts');
        if (localStorageProducts) {
            const data = JSON.parse(localStorageProducts);
            dispatch({ type: SET_CART_ITEMS, payload: data });
        }
    }, []);

    return (
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
                                            <NavItem border={true}>{t('changeLanguage')}</NavItem>
                                        </div>
                                    </Link>
                                </Nav>

                                {globalConfig.isStoreEnabled && (
                                    <CartIcon href="/panier" cartItemCount={cartItemCount} />
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
                                </NextImageSection>
                            )}

                            <Footer
                                leftText={`Copyright © 2021 ${globalConfig.app.restoName}`}
                                rightText={t('rightsReserved')}
                            />
                        </main>
                    </NavWrapper>
                </GlobalState>
            </ToastProvider>
        </Provider>
    );
}

export default appWithTranslation(App);
