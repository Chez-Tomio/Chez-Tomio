/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import React from 'react';
import Popup from 'reactjs-popup';

import { IProduct } from '../../../database/models/product';
import { ProductsForm } from './ProductsForm';

interface ProductRowProps {
    product: IProduct;
    onUpdateProduct: (newProduct: IProduct) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({ product, onUpdateProduct }) => {
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
                    onUpdateProduct={(values) => {
                        setIsEditingProduct(false);
                        onUpdateProduct(values);
                    }}
                ></ProductsForm>
            </Popup>
            <tr>
                <td>{product.title ? product.title.fr + ' / ' + product.title.en : ''}</td>
                <td>
                    {product.description
                        ? product.description.fr + ' / ' + product.description.en
                        : ''}
                </td>
                <td>
                    <img
                        src={product.image ?? ''}
                        alt="product-image"
                        css={css`
                            height: 70px;
                        `}
                    />
                </td>
                <td>${product.basePrice ?? ''}</td>
                <td>${product.minimumPrice ?? ''}</td>
                <td>
                    <input
                        type="checkbox"
                        css={css`
                            pointer-events: none;
                        `}
                        checked={product.isSpecialty ?? false}
                        readOnly={true}
                    />
                </td>
                <td>{product.extras ? product.extras.map((e) => e.title.fr).join(', ') : ''}</td>
                <td>
                    <input
                        type="checkbox"
                        css={css`
                            pointer-events: none;
                        `}
                        checked={product.archived ?? false}
                        readOnly={true}
                    />
                </td>
                <td>
                    <button type="button" onClick={() => setIsEditingProduct(true)}>
                        Edit
                    </button>
                </td>
            </tr>
        </>
    );
};
