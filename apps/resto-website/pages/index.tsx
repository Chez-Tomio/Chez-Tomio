/** @jsxRuntime classic */
/** @jsx jsx */
import {
    Button,
    ImageSection,
    SpecialtiesGrid,
    Specialty,
    WhiteSection,
} from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function Home() {
    const [session, loading] = useSession();
    const { t } = useTranslation('common');

    // {!loading && session ? (
    //     <h1>
    //         Bienvenue {session.user.email}
    //         <Button
    //             onClick={() =>
    //                 signOut({
    //                     callbackUrl: `http://localhost:3000/api/auth/logout`,
    //                 })
    //             }
    //         >
    //             Déconnexion
    //         </Button>
    //     </h1>
    // ) : (
    //     <h1>
    //         <Button onClick={() => signIn('cognito')}>Connexion</Button>
    //     </h1>
    // )}

    return (
        <>
            <Head>
                <title>Accueil - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="fill">
                <h1>Bienvenue</h1>
                <h4>Cuisine fusion asiatique!</h4>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-wrap: wrap;
                    `}
                >
                    <Button primary={true}>Voir le menu</Button>
                    <Button>Nous contacter!</Button>
                </div>
            </ImageSection>

            <WhiteSection>
                <div
                    css={css`
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: center;
                        div {
                            display: flex;
                            justify-content: center;
                        }
                    `}
                >
                    <div
                        css={css`
                            flex-direction: column;
                            flex: 66.66%;
                        `}
                    >
                        <h2>Notre restaurant</h2>
                        <p>
                            Chez Tomio vous offre une cuisine asiatique réinventée de type fusion
                            Japon-Thaï-Viet, nous voulons offrir à tous nos clients les repas santé
                            de restaurant mais servis dans notre camion de cuisine de rue. Nos
                            produits sont frais, de haute qualité et surtout à un prix abordable.
                            Faites confiance en la qualité de notre service et appelez-nous pour
                            plus de détails!
                        </p>
                    </div>
                    <div
                        css={css`
                            align-items: center;
                            margin: 30px;
                            width: 200px;
                        `}
                    >
                        <Image src="/sample-image.jpg" alt="" height={300} width={300} />
                    </div>
                </div>
            </WhiteSection>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h2>Spécialités!</h2>
            </ImageSection>

            <WhiteSection>
                <SpecialtiesGrid>
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                    <Specialty
                        imageUrl="/sample-image.jpg"
                        name="Specialty"
                        description="Description"
                    />
                </SpecialtiesGrid>
            </WhiteSection>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
    },
});
