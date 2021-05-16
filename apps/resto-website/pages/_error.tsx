import Error from 'next/error';
import React from 'react';

function ErrorPage({ statusCode }) {
    return <Error statusCode={statusCode} />;
}

ErrorPage.getInitialProps = async ({ locale, res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {
        statusCode,
        bottomBanner: false,
        headerBackgroundFull: true,
    };
};

export default ErrorPage;