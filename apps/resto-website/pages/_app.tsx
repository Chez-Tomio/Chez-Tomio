/** @jsxRuntime classic */
/** @jsx jsx */
import {
    Button,
    Footer,
    GlobalStyles,
    Header,
    HeaderSpace,
    ImageSection,
    Nav,
    NavItem,
    NavWrapper,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Provider } from 'next-auth/client';
import { signIn, signOut, useSession } from 'next-auth/client';
import { appWithTranslation, useTranslation } from 'next-i18next';

import Logo from '../public/logo.svg';

function App({ Component: Page, pageProps }: AppProps) {
    const router = useRouter();
    const { t } = useTranslation('common');
    const [session, loading] = useSession();

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
                                    border-radius: 5px;
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
                                        <span>Hey</span>
                                    ) : (
                                        // <h1>
                                        //     Bienvenue {session.user.email}
                                        //     {/* <Button onClick={() => signOut()}>Déconnexion</Button> */}
                                        // </h1>
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                            onClick={() => signIn('cognito')}
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

                    <ImageSection imageUrl="/sample-image-2.jpg">
                        <h2>Venez manger avec nous!</h2>
                        <h4>On vous servira avec grand plaisir! On espère vous voir bientôt!</h4>
                        <Link href="/contact">
                            <Button primary={true}>Nous contacter!</Button>
                        </Link>
                    </ImageSection>

                    <Footer
                        leftText="Copyright © 2021 Chez Tomio"
                        rightText="Tous droits réservés."
                    />
                </main>
            </NavWrapper>
        </Provider>
    );
}

export default appWithTranslation(App);
