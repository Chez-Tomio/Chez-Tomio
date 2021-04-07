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
                contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
            >
                <ProductsForm
                    initialValues={product}
                    onSubmitProduct={(values) => {
                        setIsEditingProduct(false);
                        onUpdateProduct(values);
                    }}
                ></ProductsForm>
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
                    <button
                        type="button"
                        onClick={() => setIsEditingProduct(true)}
                        css={css`
                            font-weight: bold;
                            padding: 3px;
                            cursor: pointer;
                        `}
                    >
                        Edit
                    </button>
                    <button
                        css={css`
                            font-weight: bold;
                            padding: 3px;
                            cursor: pointer;
                            margin-left: 15px;
                            background-color: red;
                            color: white;
                        `}
                        onClick={() =>
                            confirm(`Are you sure you want to delete ${product.title.fr}?`) &&
                            confirm('This action is irreversible!') &&
                            onDeleteProduct(product)
                        }
                    >
                        Delete {product.title.fr}
                    </button>
                </td>
            </tr>
        </>
    );
};
