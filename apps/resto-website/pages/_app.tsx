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
import { appWithTranslation, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import Logo from '../public/logo.svg';

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');

    return (
        <>
            <GlobalStyles />
            <NavWrapper>
                <main>
                    <Header>
                        <Logo
                            css={css`
                                height: 85%;
                            `}
                        />
                        <HeaderSpace />
                        <Nav>
                            <NavItem href="">Accueil</NavItem>
                            <NavItem href="">Menu</NavItem>
                            <NavItem href="">À propos</NavItem>
                            <NavItem href="">Galerie</NavItem>
                            <NavItem href="">Contactez-nous</NavItem>
                            <NavItem href="" border={true}>
                                <Link href="/" locale={router.locale === 'en' ? 'fr' : 'en'}>
                                    <span>{t('changeLanguage')}</span>
                                </Link>
                            </NavItem>
                        </Nav>
                    </Header>

                    <Page {...pageProps} />

                    <Footer
                        leftText="Copyright © 2021 Chez Tomio"
                        rightText="Tous droits réservés."
                    />
                </main>
            </NavWrapper>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default appWithTranslation(App);
