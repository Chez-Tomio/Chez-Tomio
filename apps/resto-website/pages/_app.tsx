/** @jsxRuntime classic */
/** @jsx jsx */
import {
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { ToastProvider } from 'react-toast-notifications';

import { LoginButton } from '../lib/components/app/LoginButton';
import Logo from '../public/logo.svg';

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <Provider session={pageProps.session}>
            <ToastProvider>
                <GlobalStyles />
                <NavWrapper>
                    <main
                        css={css`
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                        `}
                    >
                        <Header>
                            <Link href="/">
                                <Logo
                                    css={css`
                                        height: 85%;
                                        cursor: pointer;
                                        border-radius: 10px;
                                    `}
                                />
                            </Link>
                            <HeaderSpace />
                            <Nav>
                                <Link href="/">
                                    <div>
                                        <NavItem>Accueil</NavItem>
                                    </div>
                                </Link>
                                <Link href="/menu/categories">
                                    <div>
                                        <NavItem>Menu</NavItem>
                                    </div>
                                </Link>
                                <Link href="/a-propos">
                                    <div>
                                        <NavItem>À propos</NavItem>
                                    </div>
                                </Link>
                                <Link href="/galerie">
                                    <div>
                                        <NavItem>Galerie</NavItem>
                                    </div>
                                </Link>
                                <Link href="/contact">
                                    <div>
                                        <NavItem>Contactez-nous</NavItem>
                                    </div>
                                </Link>

                                <Link
                                    href={router.asPath}
                                    locale={router.locale === 'fr' ? 'en' : 'fr'}
                                >
                                    <div>
                                        <NavItem border={true}>{t('changeLanguage')}</NavItem>
                                    </div>
                                </Link>
                            </Nav>

                            <LoginButton />

                            <div
                                css={css`
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-left: 15px;
                                `}
                            >
                                <Link href="/cart">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        css={css`
                                            height: 30px;
                                            transition: 0.2s;
                                            cursor: pointer;
                                            &:hover {
                                                transform: translateY(-3px);
                                            }
                                        `}
                                    >
                                        <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                                    </svg>
                                </Link>
                            </div>
                        </Header>

                        <Page {...pageProps} />

                        <Footer
                            leftText="Copyright © 2021 Chez Tomio"
                            rightText="Tous droits réservés."
                        />
                    </main>
                </NavWrapper>
            </ToastProvider>
        </Provider>
    );
}

export default appWithTranslation(App);
