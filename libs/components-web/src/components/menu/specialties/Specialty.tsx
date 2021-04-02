/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface SpecialtyProps {
    imageUrl: string;
    name: string;
    description: string;
}

const styles = css`
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    display: flex;
    color: #000;
    flex: 1 0 auto;
    align-items: center;
    max-width: 100vw;
    img {
        border-radius: 50%;
        width: 200px;
        max-width: 40%;
    }
    .specialty-text-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
    }
`;

export const Specialty: React.FC<SpecialtyProps> = ({ imageUrl, name, description }) => (
    <div css={styles}>
        <img src={imageUrl} alt="specialty-img" />
        <div className="specialty-text-container">
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    </div>
);
