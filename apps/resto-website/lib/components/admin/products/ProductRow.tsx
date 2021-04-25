/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';

import { ISerializedProduct } from '../../../database/mongo';
import { ProductsForm } from './ProductsForm';

interface ProductRowProps {
    product: ISerializedProduct;
    onUpdateProduct: (newProduct: ISerializedProduct) => void;
    onDeleteProduct: (product: ISerializedProduct) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
    product,
    onUpdateProduct,
    onDeleteProduct,
}) => {
    const [isEditingProduct, setIsEditingProduct] = useState(false);

    return (
        <>
            <Popup
                open={isEditingProduct}
                closeOnDocumentClick
                onClose={() => setIsEditingProduct(false)}
            >
                <ProductsForm
                    initialValues={product}
                    onSubmitProduct={(values) => {
                        setIsEditingProduct(false);
                        onUpdateProduct(values);
                    }}
                >
                    <button
                        css={css`
                            font-weight: bold;
                            padding: 3px;
                            cursor: pointer;
                            margin-top: 15px;
                            background-color: red;
                            color: white;
                        `}
                        onClick={() => {
                            if (
                                confirm(`Are you sure you want to delete ${product.title.fr}?`) &&
                                confirm('This action is irreversible!')
                            ) {
                                setIsEditingProduct(false);
                                onDeleteProduct(product);
                            }
                        }}
                    >
                        Delete
                    </button>
                </ProductsForm>
            </Popup>
            <tr>
                <td>
                    {product.title.fr} / {product.title.en}
                </td>
                <td>
                    {product.description.fr} / {product.description.en}
                </td>
                <td>
                    <img
                        src={product.image}
                        alt="product-image"
                        css={css`
                            height: 70px;
                        `}
                    />
                </td>
                <td>${product.basePrice}</td>
                <td>
                    <input
                        type="checkbox"
                        css={css`
                            pointer-events: none;
                        `}
                        checked={product.isSpecialty}
                        readOnly={true}
                    />
                </td>
                <td>{product.extras.map((e) => e.title.fr).join(', ')}</td>
                <td>
                    <input
                        type="checkbox"
                        css={css`
                            pointer-events: none;
                        `}
                        checked={product.archived}
                        readOnly={true}
                    />
                </td>
                <td>
                    <div
                        css={css`
                            display: flex;
                            flex-direction: column;
                        `}
                    >
                        <button
                            type="button"
                            onClick={() => setIsEditingProduct(true)}
                            css={css`
                                font-weight: bold;
                                padding: 3px;
                                cursor: pointer;
                            `}
                        >
                            Edit {product.title.fr}
                        </button>
                    </div>
                </td>
            </tr>
        </>
    );
};
