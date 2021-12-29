/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

export interface ProductTileProps {
    imageUrl: string;
    title: string;
    description?: string;
    price: number;
    onClickAdd: () => void;
}

const productTileStyles = css`
    font-family: 'Montserrat', sans-serif;
    height: 150px;
    border-radius: 20px;
    display: flex;
    transition: all 0.5s;
    color: black;
    overflow: hidden;
    box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1), 5px 5px 15px rgba(0, 0, 0, 0.1);
    z-index: 2;
    position: relative;
    background-color: white;
    margin-bottom: 0px;
    transition: 0.2s;
    cursor: pointer;
    .content {
        padding: 20px 20px;
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
            font-weight: 800;
            font-size: 1.2rem;
            margin-bottom: 4px;
        }
        .description {
            font-size: 0.875rem;
            margin-bottom: 4px;
            color: #595959;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        .price {
            font-weight: 500;
            font-size: 1rem;
            margin-top: auto;
        }
    }
    &:hover {
        transform: scale(103%);
    }
    .add-btn {
        height: 30px;
        width: 30px;
        color: #0ec663;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
`;

export const ProductTile: React.FC<ProductTileProps> = ({
    imageUrl,
    title,
    description,
    price,
    onClickAdd,
}) => (
    <div className="tile" css={productTileStyles} onClick={() => onClickAdd()}>
        <div className="content">
            <span className="title">{title}</span>
            {description && <span className="description">{description}</span>}
            <span className="price">${price.toFixed(2)}</span>
        </div>
        {imageUrl && (
            <div
                css={css`
                    background-image: url(${imageUrl});
                    background-position: center;
                    background-size: cover;
                    width: 150px;
                `}
            ></div>
        )}
    </div>
);
