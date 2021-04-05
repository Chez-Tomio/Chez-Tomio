/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function Profil() {
    const { t } = useTranslation('common');
    const [session, loading] = useSession();

    return (
        <>
            <Head>
                <title>Profil - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>Profil</h1>
            </ImageSection>

            <WhiteSection>
                {!loading && session ? (
                    <div
                        css={css`
                            width: 100%;
                        `}
                    >
                        <h3>{session.user.email}</h3>
                        <Button
                            primary={true}
                            onClick={() =>
                                signOut({
                                    callbackUrl: `http://localhost:3000/api/auth/logout`,
                                })
                            }
                        >
                            Déconnexion
                        </Button>
                    </div>
                ) : (
                    <h1>
                        <Button primary={true} onClick={() => signIn('cognito')}>
                            Connexion
                        </Button>
                    </h1>
                )}
            </WhiteSection>

            <ImageSection imageUrl="/sample-image-2.jpg">
                <h2>Venez manger avec nous!</h2>
                <h4>On vous servira avec grand plaisir! On espère vous voir bientôt!</h4>
                <Link href="/contact">
                    <Button primary={true}>Nous contacter!</Button>
                </Link>
            </ImageSection>
        </>
    );
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
    },
});
