/** @jsxRuntime classic */
/** @jsx jsx */
import {
    Footer,
    GlobalStyles,
    Header,
    HeaderSpace,
    Nav,
    NavItem,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import Logo from '../public/logo.svg';

function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [navIsOpen, navSetOpen] = useState(false);
    const isHamburger = useMediaQuery({ query: '(max-width: 1100px)' });

    return (
        <>
            <GlobalStyles />
            <main
                css={css`
                    position: absolute;
                    width: 100vw;
                    right: ${isHamburger && navIsOpen ? '500px' : '0px'};
                    transition: right 0.3s;
                    &:after {
                        content: '';
                        background-color: black;
                        opacity: 0.8;
                    }
                `}
            >
                <Header>
                    <Logo
                        css={css`
                            height: 85%;
                        `}
                    />
                    <HeaderSpace />
                    <Nav
                        isHamburger={isHamburger}
                        onUpdate={(isOpen: boolean) => {
                            navSetOpen(isOpen);
                        }}
                    >
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

                <Component {...pageProps} />

                <Footer
                    leftText="Copyright © 2021 Chez Tomio"
                    rightText="Tous droits réservés."
                ></Footer>
            </main>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});

export default appWithTranslation(App);
