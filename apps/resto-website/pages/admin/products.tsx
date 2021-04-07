/** @jsxRuntime classic */
/** @jsx jsx */
import 'reactjs-popup/dist/index.css';

import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Popup from 'reactjs-popup';

import { CategoriesForm } from '../../lib/components/admin/products/CategoriesForm';
import { CategoryTable } from '../../lib/components/admin/products/CategoryTable';
import {
    Category,
    connectToDatabase,
    ISerializedCategoryWithProducts,
    ISerializedProduct,
} from '../../lib/database/mongo';

export default function Admin({
    categories: initialCategories,
}: {
    categories: ISerializedCategoryWithProducts[];
}) {
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categories, setCategories] = useState(initialCategories);
    const { addToast } = useToasts();

    async function updateCategory(index: number, newCategory: ISerializedCategoryWithProducts) {
        categories[index] = newCategory;
        setCategories([...categories]);

        try {
            const response = await fetch(`/api/categories/${newCategory._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw await response.json();
            addToast(`The category "${newCategory.title.en}" was successfully updated`, {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error(error);
            alert(`An error occured while while updating the category "${newCategory.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    async function addCategory(newCategory: ISerializedCategoryWithProducts) {
        setIsAddingCategory(false);
        categories.push(newCategory);
        setCategories([...categories]);

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw await response.json();
            alert(`The category "${newCategory.title.en}" was successfully created`);
        } catch (error) {
            console.error(error);
            alert(`An error occured while while creating the category "${newCategory.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    async function deleteCategory(category: ISerializedCategoryWithProducts) {
        setCategories(categories.filter((c) => c._id !== category._id));

        try {
            const response = await fetch(`/api/categories/${category._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw await response.json();
            alert(`The category "${category.title.en}" was successfully deleted`);
        } catch (error) {
            console.error(error);
            alert(`An error occured while while deleting the category "${category.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    async function updateProduct(newProduct: ISerializedProduct) {
        try {
            const response = await fetch(`/api/products/${newProduct._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });
            if (!response.ok) throw await response.json();
            alert(`The product "${newProduct.title.en}" was successfully updated`);
        } catch (error) {
            console.error(error);
            alert(`An error occured while while updating the product "${newProduct.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    async function addProduct(
        newProduct: ISerializedProduct,
        category: ISerializedCategoryWithProducts,
    ) {
        try {
            {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                });
                if (!response.ok) throw await response.json();
                newProduct._id = (await response.json())._id;
            }
            {
                const response = await fetch(`/api/categories/${category._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        products: [...category.products.map((p) => p._id), newProduct._id],
                    }),
                });
                if (!response.ok) throw await response.json();
            }
            alert(`The product "${newProduct.title.en}" was successfully created`);
        } catch (error) {
            console.error(error);
            alert(`An error occured while while creating the product "${newProduct.title.en}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    async function deleteProduct(product: ISerializedProduct) {
        try {
            const response = await fetch(`/api/products/${product._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw await response.json();
            alert(`The product "${product.title.en}" was successfully deleted`);
        } catch (error) {
            console.error(error);
            alert(`An error occured while while deleting the product "${product.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    return (
        <>
            <div
                css={css`
                    background-color: white;
                    margin-top: 120px;
                    color: black;
                    height: 100%;
                    flex: 1;
                `}
            >
                <Head>
                    <title>Admin Products - Chez Tomio</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <h2
                    css={css`
                        font-size: 2.4rem;
                        padding: 10px;
                    `}
                >
                    Products
                </h2>

                <Popup
                    open={isAddingCategory}
                    closeOnDocumentClick
                    onClose={() => setIsAddingCategory(false)}
                    contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
                >
                    <CategoriesForm
                        initialValues={{
                            title: { fr: '', en: '' },
                            image: '',
                            archived: false,
                        }}
                        onSubmitCategory={addCategory}
                    />
                </Popup>
                <button
                    css={css`
                        font-weight: bold;
                        padding: 5px;
                        cursor: pointer;
                        margin-bottom: 30px;
                    `}
                    onClick={() => setIsAddingCategory(true)}
                >
                    Add Category
                </button>

                {categories.map((c, i) => (
                    <CategoryTable
                        key={c._id}
                        category={c}
                        onUpdateCategory={(newCategory) => updateCategory(i, newCategory)}
                        onDeleteCategory={(category) => deleteCategory(category)}
                        onUpdateProduct={(newProduct) => updateProduct(newProduct)}
                        onAddProduct={(newProduct, category) => addProduct(newProduct, category)}
                        onDeleteProduct={(product) => deleteProduct(product)}
                    />
                ))}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    await connectToDatabase();
    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            categories: JSON.parse(JSON.stringify(await Category.find().populate('products'))),
        },
    };
};
