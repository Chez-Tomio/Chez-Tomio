/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

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
