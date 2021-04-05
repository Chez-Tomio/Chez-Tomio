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
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LoginButton } from '../lib/components/LoginButton';
import Logo from '../public/logo.svg';

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <Provider session={pageProps.session}>
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

                            <Link href="" locale={router.locale === 'fr' ? 'en' : 'fr'}>
                                <div>
                                    <NavItem border={true}>{t('changeLanguage')}</NavItem>
                                </div>
                            </Link>
                        </Nav>
                        <LoginButton />
                    </Header>

                    <Page {...pageProps} />

                    <Footer
                        leftText="Copyright © 2021 Chez Tomio"
                        rightText="Tous droits réservés."
                    />
                </main>
            </NavWrapper>
        </Provider>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default appWithTranslation(App);
