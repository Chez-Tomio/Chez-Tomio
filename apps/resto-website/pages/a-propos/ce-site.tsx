/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { uniqBy } from 'lodash';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import packageJsonComponentsWeb from '../../../../libs/components-web/package.json';
import packageJsonRestoWebsite from '../../package.json';

export default function ThisSite() {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>About This Site - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ImageSection imageUrl="/sample-image.jpg" size="half">
                <h1>About This Site</h1>
            </ImageSection>

            <WhiteSection>
                <h4>
                    Les librairies et sources suivantes ont été utilisées dans la création de ce
                    site:
                </h4>
                <div
                    css={css`
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(50ch, 1fr));
                        width: 100%;
                        grid-gap: 20px;
                        .item {
                            display: flex;
                            align-items: center;
                            justify-content: center;
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

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
    },
});
