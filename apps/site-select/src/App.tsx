/** @jsxRuntime classic */
/** @jsx jsx */
import { Footer } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SiteTile } from './components/SiteTile';

export default function App() {
    const { t } = useTranslation();

    return (
        <main
            css={css`
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            `}
        >
            <div
                css={css`
                    flex: 1;
                    background-color: white;
                    color: black;
                    padding: 5% 10%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                `}
            >
                <div
                    css={css`
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 2%;
                        @media only screen and (max-width: 800px) {
                            flex-direction: column;
                        }
                    `}
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                        css={css`
                            height: 100px;
                        `}
                    />
                    <h3
                        css={css`
                            padding: 0 2%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        `}
                    >
                        {t('selectService')}
                    </h3>
                </div>

                <div
                    css={css`
                        flex: 1;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        @media only screen and (max-width: 800px) {
                            flex-direction: column;
                        }
                    `}
                >
                    <SiteTile href="https://cheztomio.com" imageUrl="/rockland.jpg">
                        {t('sites.restaurant')}
                    </SiteTile>
                    <SiteTile href="https://cheztomio.com" imageUrl="/truck.png">
                        {t('sites.foodtruck')}
                    </SiteTile>
                </div>
            </div>
            <Footer leftText="Copyright © 2021 Chez Tomio" rightText={t('rightsReserved')} />
        </main>
    );
}
