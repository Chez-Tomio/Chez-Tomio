/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { ISerializedCategoryWithProducts, ISerializedProduct } from '../../../database/mongo';
import { CategoriesForm } from './CategoriesForm';
import { ProductRow } from './ProductRow';
import { ProductsForm } from './ProductsForm';

interface CategoryProps {
    category: ISerializedCategoryWithProducts;
    onUpdateCategory: (newCategory: ISerializedCategoryWithProducts) => void | Promise<void>;
    onDeleteCategory: (product: ISerializedCategoryWithProducts) => void | Promise<void>;
    onUpdateProduct: (newProduct: ISerializedProduct) => void | Promise<void>;
    onAddProduct: (
        newProduct: ISerializedProduct,
        category: ISerializedCategoryWithProducts,
    ) => void | Promise<void>;
    onDeleteProduct: (product: ISerializedProduct) => void | Promise<void>;
}

export const CategoryTable: React.FC<CategoryProps> = ({
    category,
    onUpdateCategory,
    onDeleteCategory,
    onUpdateProduct,
    onAddProduct,
    onDeleteProduct,
}) => {
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [products, setProducts] = useState(category.products);

    async function updateProduct(index: number, newProduct: ISerializedProduct) {
        await onUpdateProduct(newProduct);
        products[index] = newProduct;
        setProducts([...products]);
    }

    async function addProduct(newProduct: ISerializedProduct) {
        await onAddProduct(newProduct, category);
        products.push(newProduct);
        setProducts([...products]);
        setIsAddingProduct(false);
    }

    async function deleteProduct(product: ISerializedProduct) {
        await onDeleteProduct(product);
        setProducts(products.filter((c) => c._id !== product._id));
    }

    async function deleteCategory() {
        await onDeleteCategory(category);
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
            >
                <CategoriesForm
                    initialValues={category}
                    onSubmitCategory={(values) => {
                        setIsEditingCategory(false);
                        onUpdateCategory(values);
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
                <button
                    css={css`
                        font-weight: bold;
                        padding: 3px;
                        cursor: pointer;
                        margin-left: 15px;
                        background-color: red;
                        color: white;
                    `}
                    onClick={() => deleteCategory()}
                >
                    Delete {category.title.fr}
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
                        <th>Specialty</th>
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
                            onUpdateProduct={(newProduct) => updateProduct(i, newProduct)}
                            onDeleteProduct={() => deleteProduct(p)}
                        />
                    ))}
                </tbody>
            </table>
            <Popup
                open={isAddingProduct}
                closeOnDocumentClick
                onClose={() => setIsAddingProduct(false)}
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
                    cursor: pointer;
                `}
                onClick={() => setIsAddingProduct(true)}
            >
                Add Product
            </button>
        </div>
    );
};
