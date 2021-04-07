/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';

import { IProduct } from '../../../database/mongo';
import { ProductsForm } from './ProductsForm';

interface ProductRowProps {
    product: IProduct;
    onSubmitProduct: (newProduct: IProduct) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, onSubmitProduct }) => {
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
                        onSubmitProduct(values);
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
                </td>
            </tr>
        </>
    );
};
