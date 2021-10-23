/** @jsxRuntime classic */
/** @jsx jsx */
import 'react-vertical-timeline-component/style.min.css';

import { Button, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { GetStaticProps } from 'next';
import getConfig from 'next/config';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import { NextImageSection } from '../../lib/components/NextImageSection';

const { aboutConfig } = getConfig().publicRuntimeConfig.pagesConfig;

export default function AboutUs() {
    const { t } = useTranslation('about');

    return (
        <>
            <Head>
                <title>{t('pageName')} - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <NextImageSection imageUrl={aboutConfig.topBannerImage} size="half">
                <h1>{t('pageName')}</h1>
            </NextImageSection>

            <WhiteSection>
                <div
                    css={css`
                        overflow: hidden;
                    `}
                >
                    <VerticalTimeline
                        css={css`
                            &::before {
                                background: #ddd;
                            }
                        `}
                    >
                        <VerticalTimelineElement
                            date="2007"
                            contentStyle={{ background: '#ededed' }}
                            contentArrowStyle={{ borderRight: '7px solid  #ededed' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-stars"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                                </svg>
                            }
                        >
                            <div>
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2007Title')}
                                </h3>
                                <p>{t('event2007Description')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            date="2011"
                            contentStyle={{ background: 'rgb(33, 150, 243)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-door-open"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                </svg>
                            }
                        >
                            <div
                                css={css`
                                    color: white;
                                `}
                            >
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2011Title')}
                                </h3>
                                <p>{t('event2011Description')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            date="2014"
                            contentStyle={{ background: '#ededed' }}
                            contentArrowStyle={{ borderRight: '7px solid  #ededed' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-box-seam"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                                </svg>
                            }
                        >
                            <div>
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2014Title')}
                                </h3>
                                <p>{t('event2014Description')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            date={`2017 - ${new Date().getFullYear()}`}
                            contentStyle={{ background: 'rgb(33, 150, 243)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-truck"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                            }
                        >
                            <div
                                css={css`
                                    color: white;
                                `}
                            >
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2017NowTitle')}
                                </h3>
                                <p>{t('event2017NowDescription')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            date="2019"
                            contentStyle={{ background: '#ededed' }}
                            contentArrowStyle={{ borderRight: '7px solid  #ededed' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-geo-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                                    />
                                </svg>
                            }
                        >
                            <div>
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2019Title')}
                                </h3>
                                <p>{t('event2019Description')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            date="2021"
                            contentStyle={{ background: 'rgb(33, 150, 243)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-door-open"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                                    <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117zM11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5zM4 1.934V15h6V1.077l-6 .857z" />
                                </svg>
                            }
                        >
                            <div
                                css={css`
                                    color: white;
                                `}
                            >
                                <h3 className="vertical-timeline-element-title">
                                    {t('event2021Title')}
                                </h3>
                                <p>{t('event2021Description')}</p>
                            </div>
                        </VerticalTimelineElement>
                        <VerticalTimelineElement
                            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                            icon={
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-star-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            }
                        />
                    </VerticalTimeline>
                </div>

                <div
                    css={css`
                        margin-top: 50px;
                    `}
                >
                    <Link href="/a-propos/ce-site">
                        <Button primary={true}>{t('aboutThisSite')}</Button>
                    </Link>
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
