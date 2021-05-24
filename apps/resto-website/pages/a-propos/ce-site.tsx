/** @jsxRuntime classic */
/** @jsx jsx */
import { ImageSection, WhiteSection } from '@chez-tomio/components-web';
import packageJsonComponentsWeb from '@chez-tomio/components-web/package.json';
import { css, jsx } from '@emotion/react';
import { uniqBy } from 'lodash';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import * as pageConfig from '../../config/pages/about.json';
import packageJsonRestoWebsite from '../../package.json';

export default function ThisSite() {
    const { t } = useTranslation('about');

    return (
        <>
            <Head>
                <title>{t('aboutThisSiteTitle')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl={pageConfig.topBannerImage} size="half">
                <h1>{t('aboutThisSiteTitle')}</h1>
            </ImageSection>

            <WhiteSection>
                <h4>{t('credits')}</h4>
                <div
                    css={css`
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr));
                        width: 100%;
                        grid-gap: 20px;
                        .item {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            text-align: center;
                        }
                    `}
                >
                    {uniqBy(
                        [
                            ...Object.entries(packageJsonComponentsWeb.dependencies),
                            ...Object.entries(packageJsonRestoWebsite.dependencies),
                        ],
                        ([p]) => p,
                    )
                        .filter(([name]) => !name.startsWith('@chez-tomio'))
                        .map(([name, versionRange]) => ({
                            name,
                            version: versionRange.replace(/^(\^|~)/, ''),
                        }))
                        .map(({ name, version }) => (
                            <div key={`${name}@${version}`} className="item">
                                <Link
                                    href={`https://npmjs.com/package/${name}/v/${version}`}
                                >{`${name}@${version}`}</Link>
                            </div>
                        ))}
                    <div className="item">
                        <Link href={`https://icons.getbootstrap.com/icons`}>Bootstrap Icons</Link>
                    </div>
                    <div className="item">
                        <Link
                            href={`https://github.com/shnydercom/lerna-typescript-cra-uilib-starter`}
                        >
                            lerna-typescript-cra-uilib-starter
                        </Link>
                    </div>
                </div>
            </WhiteSection>
        </>
    );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common', 'about'])),
    },
});
