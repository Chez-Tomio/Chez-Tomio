/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { ICategory } from '../../../database/mongo';
import { IProduct } from '../../../database/mongo';
import { CategoriesForm } from './CategoriesForm';
import { ProductRow } from './ProductRow';
import { ProductsForm } from './ProductsForm';

interface CategoryProps {
    category: ICategory;
    onSubmitCategory: (newCategory: ICategory) => void;
}

export const Category: React.FC<CategoryProps> = ({ category, onSubmitCategory }) => {
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    const [isAddingProduct, setIsAddingProduct] = useState(false);
    //@ts-expect-error
    const [products, setProducts] = useState(category.products as IProduct[]);

    function updateProduct(index: number, newProductData: IProduct) {
        products[index] = newProductData;
        setProducts([...products]);
        // PUT product to database
    }

    function addProduct(newProductData: IProduct) {
        products.push(newProductData);
        setProducts([...products]);
        onSubmitCategory(category);
        setIsAddingProduct(false);
        // POST product to database
    }

    return (
        <div
            css={css`
                margin-bottom: 50px;
            `}
        >
            <Popup
                open={isEditingCategory}
                closeOnDocumentClick
                onClose={() => setIsEditingCategory(false)}
                contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
            >
                <CategoriesForm
                    initialValues={category}
                    onSubmitCategory={(values) => {
                        setIsEditingCategory(false);
                        onSubmitCategory(values);
                    }}
                ></CategoriesForm>
            </Popup>
            {category.image && (
                <img
                    src={category.image}
                    css={css`
                        height: 70px;
                    `}
                />
            )}
            <div
                css={css`
                    display: flex;
                    align-items: center;
                `}
            >
                {category.archived && (
                    <div
                        css={css`
                            background-color: gray;
                            color: white;
                            padding: 5px;
                            font-size: 0.6rem;
                            margin: 0 10px;
                        `}
                    >
                        Archived
                    </div>
                )}
                <h3>
                    {category.title.fr} / {category.title.en}
                </h3>
                <button
                    css={css`
                        font-weight: bold;
                        padding: 3px;
                        cursor: pointer;
                        margin-left: 15px;
                    `}
                    onClick={() => setIsEditingCategory(true)}
                >
                    Edit {category.title.fr}
                </button>
            </div>

            <table
                css={css`
                    width: 100%;
                    border-collapse: collapse;
                    th,
                    td {
                        border: 1px #000 solid;
                        padding: 5px;
                    }
                `}
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Base Price</th>
                        <th>Speciality</th>
                        <th>Extras</th>
                        <th>Archived</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, i) => (
                        <ProductRow
                            key={p._id}
                            product={p}
                            onSubmitProduct={(newProduct) => updateProduct(i, newProduct)}
                        />
                    ))}
                </tbody>
            </table>
            <Popup
                open={isAddingProduct}
                closeOnDocumentClick
                onClose={() => setIsAddingProduct(false)}
                contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
            >
                <ProductsForm
                    initialValues={{
                        title: { fr: '', en: '' },
                        description: { fr: '', en: '' },
                        image: '',
                        basePrice: 0,
                        isSpecialty: false,
                        extras: [],
                        archived: false,
                    }}
                    onSubmitProduct={addProduct}
                ></ProductsForm>
            </Popup>
            <button
                css={css`
                    font-weight: bold;
                    padding: 5px;
                    float: right;
                    cursor: pointer;
                `}
                onClick={() => setIsAddingProduct(true)}
            >
                Add Product
            </button>
        </div>
    );
};
