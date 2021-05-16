import { GetServerSideProps } from 'next';
import Error from 'next/error';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function ErrorPage({ errorCode }) {
    if (errorCode) {
        return <Error statusCode={errorCode} />;
    }
}

export const getServerSideProps: GetServerSideProps = async ({ locale, res }) => {
    const errorCode = res ? res.statusCode : 404;

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            headerBackgroundFull: true,
            bottomBanner: false,
            errorCode,
        },
    };
};
