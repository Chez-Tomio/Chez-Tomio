/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import { isUserAdmin } from '../../lib/api/utils';
import { Category, connectToDatabase } from '../../lib/database/mongo';

export default function Admin() {
    return (
        <>
            <Head>
                <title>Admin Orders - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
    await connectToDatabase();

    const isAdmin = await isUserAdmin(req);
    if (!isAdmin) {
        res.statusCode = 403;
        res.end(STATUS_CODES[res.statusCode]);
        return { props: {} };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            categories: JSON.parse(JSON.stringify(await Category.find().populate('products'))),
        },
    };
};
