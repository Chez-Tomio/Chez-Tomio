/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, Footer } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QrReader from 'react-qr-reader';
import validUrl from 'valid-url';

export default function App() {
    const { t } = useTranslation();
    const [showScanner, setShowScanner] = useState(false);
    const [displayedError, setDisplayedError] = useState('');
    const [scannedUrl, setScannedUrl] = useState('');

    const handleScan = (data: any) => {
        if (data) {
            if (validUrl.isUri(data)) {
                console.log('Looks like an URI');
                setDisplayedError('');
                setScannedUrl(data);
            } else {
                console.log('Not an URI');
                setDisplayedError(t('notValidUrl'));
            }
        }
    };

    const handleError = (err: any) => {
        console.error(err);
        setDisplayedError(t('deviceUnsupported'));
    };

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
                        {t('qrScanner')}
                    </h3>
                </div>

                <div
                    css={css`
                        flex: 1;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        margin-bottom: 20px;
                    `}
                >
                    {showScanner && (
                        <QrReader
                            delay={300}
                            onError={handleError}
                            onScan={handleScan}
                            css={css`
                                width: 400px;
                                max-width: 100%;
                                margin: 20px 0;
                            `}
                        />
                    )}
                    {scannedUrl !== '' && (
                        <Button
                            primary={true}
                            size="large"
                            onClick={() => {
                                window.open(scannedUrl, '_blank');
                            }}
                        >
                            {t('open')} {scannedUrl}
                        </Button>
                    )}
                    {displayedError !== '' && (
                        <p
                            css={css`
                                color: red;
                            `}
                        >
                            {displayedError}
                        </p>
                    )}
                    <ol
                        css={css`
                            margin: 20px 0;
                            counter-reset: step-counter;
                            list-style: none;
                            padding-left: 1rem;
                            li {
                                box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
                                    5px 5px 15px rgba(0, 0, 0, 0.1);
                                margin-top: 1rem;
                                padding: 1rem 1.5rem 1rem 3.5rem;
                                border-radius: 0.5rem;
                                position: relative;
                                counter-increment: step-counter;
                                display: flex;
                                align-items: center;
                                &::before {
                                    content: counter(step-counter);
                                    font: 900 1.5rem 'Montserrat';
                                    z-index: 1;
                                    position: absolute;
                                    top: 50%;
                                    left: 20px;
                                    transform: translateY(-50%);
                                }
                            }
                        `}
                    >
                        <li>{t('scanSteps.0')}</li>
                        <li>{t('scanSteps.1')}</li>
                        <li>{t('scanSteps.2')}</li>
                        <li>{t('scanSteps.3')}</li>
                    </ol>
                    <Button
                        primary={true}
                        size="large"
                        onClick={() => {
                            setShowScanner(true);
                        }}
                    >
                        {t('scanQrCode')}
                    </Button>
                </div>
            </div>
            <Footer leftText="Copyright © 2021 Chez Tomio" rightText={t('rightsReserved')} />
        </main>
    );
}
