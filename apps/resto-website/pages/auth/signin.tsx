/** @jsxRuntime classic */
/** @jsx jsx */
import { Button } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import { providers as getProviders, signIn } from 'next-auth/client';
import { AppProvider, DefaultProviders } from 'next-auth/providers';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function SignIn({
    providers,
}: {
    providers: Record<keyof DefaultProviders | string, AppProvider>;
}) {
    const cognitoProvider = providers['cognito'];

    return (
        <div
            css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                flex: 1;
                min-height: 500px;
            `}
        >
            <div
                css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background-color: white;
                    color: black;
                    padding: 50px 50px;
                    border-radius: 20px;
                `}
            >
                <h3>Sign In</h3>
                <div key={cognitoProvider.name}>
                    <Button primary={true} onClick={() => signIn(cognitoProvider.id)}>
                        Sign in with email
                    </Button>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const providers = await getProviders();
    return {
        props: {
            providers,
            ...(await serverSideTranslations(locale!, ['common'])),
        },
    };
};
