import { GetStaticProps } from 'next';
import Error from 'next/error';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

function NotFoundPage() {
    return <Error statusCode={404} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            bottomBanner: false,
            headerBackgroundFull: true,
        },
    };
};

export default NotFoundPage;
