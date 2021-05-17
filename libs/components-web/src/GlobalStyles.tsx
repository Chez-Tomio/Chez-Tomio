/** @jsxRuntime classic */
/** @jsx jsx */
import { css, Global, jsx } from '@emotion/react';

export const GlobalStyles = () => (
    <Global
        styles={css`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

            * {
                box-sizing: border-box;
                padding: 0;
                margin: 0;
            }

            html,
            body {
                font-family: 'Montserrat', sans-serif;
                background-color: black;
                color: white;
                min-height: 100%;
            }

            p {
                margin: 1rem 0;
                line-height: 2rem;
            }

            hr {
                width: 80%;
                border: none;
                height: 2px;
                background-color: #f0f0f0;
                margin: 20px 0;
                border-radius: 2px;
            }

            h1 {
                font-weight: 900;
                font-size: 5rem;
                text-transform: uppercase;
            }

            h2 {
                font-weight: 900;
                font-size: 4rem;
            }

            h3 {
                font-weight: 800;
                font-size: 1.8rem;
            }

            h4 {
                font-weight: 400;
                font-size: 1.3rem;
                margin: 10px 0;
            }

            /* Extra large screens, TV */
            @media (min-width: 1201px) {
            }

            /* Desktops, large screens */
            @media (max-width: 1200px) {
            }

            /* Small screens, laptops */
            @media (max-width: 1024px) {
            }

            /* iPads, Tablets */
            @media (max-width: 768px), (max-height: 480px) {
                h1 {
                    font-size: 4rem;
                }
                h2 {
                    font-size: 3rem;
                }
            }

            /* Mobile devices */
            @media (max-width: 480px), (max-height: 320px) {
                h1 {
                    font-size: 3rem;
                }
                h2 {
                    font-size: 2.5rem;
                }
                h3 {
                    font-size: 1.6rem;
                }
                h4 {
                    font-size: 1.1rem;
                }
            }
        `}
    />
);
