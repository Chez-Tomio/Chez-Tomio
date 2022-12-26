/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { isAdmin } from '../../lib/api/utils';

export default function Admin() {
    const { data: session } = useSession();

    return (
        <>
            <Head>
                <title>Admin - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div
                css={css`
                    background-color: white;
                    margin-top: 120px;
                    color: black;
                    height: 100%;
                    flex: 1;
                    padding: 20px;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    `}
                >
                    <Link href="/admin/products">-&gt; Products</Link>
                    <Link href="/admin/orders">-&gt; Orders</Link>

                    <div
                        css={css`
                            display: flex;
                            flex-direction: column;
                            margin-top: 30px;
                        `}
                    >
                        <span>Signed in as {session?.user?.email}</span>
                        <button
                            css={css`
                                width: 100px;
                            `}
                            onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
    if (!(await isAdmin(req, res))) {
        return {
            redirect: {
                permanent: false,
                destination: '/login',
            },
            props: {},
        };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            headerBackgroundFull: true,
            bottomBanner: false,
        },
    };
};
