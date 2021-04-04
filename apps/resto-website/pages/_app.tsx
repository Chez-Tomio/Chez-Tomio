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
import { Provider } from 'next-auth/client';
import { useSession, signIn, signOut } from 'next-auth/client';

import Logo from '../public/logo.svg';

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [session, loading] = useSession();

    return (
        <Provider session={pageProps.session}>
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
                            <Link href="">
                                <div>
                                    <NavItem>Accueil</NavItem>
                                </div>
                            </Link>
                            <Link href="">
                                <div>
                                    <NavItem>Menu</NavItem>
                                </div>
                            </Link>
                            <Link href="">
                                <div>
                                    <NavItem>À propos</NavItem>
                                </div>
                            </Link>
                            <Link href="">
                                <div>
                                    <NavItem>Galerie</NavItem>
                                </div>
                            </Link>
                            <Link href="">
                                <div>
                                    <NavItem>Contactez-nous</NavItem>
                                </div>
                            </Link>
                            <Link href="">
                                <div
                                    css={css`
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        cursor: pointer;
                                        padding: 10px;
                                    `}
                                >
                                    {!loading && session ? (
                                        <h1>
                                            Bienvenue {session.user.email}
                                            {/* <Button onClick={() => signOut()}>Déconnexion</Button> */}
                                        </h1>
                                    ) : (
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            onClick={() => signIn()}
                                            css={css`
                                                height: 35px;
                                                transition: 0.2s;
                                                &:hover {
                                                    transform: scale(110%);
                                                }
                                            `}
                                        >
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                                        </svg>
                                    )}
                                </div>
                            </Link>
                            <Link href="/" locale={router.locale === 'fr' ? 'en' : 'fr'}>
                                <div>
                                    <NavItem border={true}>{t('changeLanguage')}</NavItem>
                                </div>
                            </Link>
                        </Nav>
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
