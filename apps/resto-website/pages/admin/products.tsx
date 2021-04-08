/** @jsxRuntime classic */
/** @jsx jsx */
import 'reactjs-popup/dist/index.css';

import { css, jsx } from '@emotion/react';
import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Popup from 'reactjs-popup';

import { isUserAdmin } from '../../lib/api/utils';
import { CategoriesForm } from '../../lib/components/admin/products/CategoriesForm';
import { CategoryTable } from '../../lib/components/admin/products/CategoryTable';
import {
    Category,
    connectToDatabase,
    ISerializedCategoryWithProducts,
    ISerializedProduct,
} from '../../lib/database/mongo';
import Link from 'next/link';

export default function AdminProducts({
    categories: initialCategories,
}: {
    categories: ISerializedCategoryWithProducts[];
}) {
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categories, setCategories] = useState(initialCategories);
    const { addToast } = useToasts();

    async function updateCategory(index: number, newCategory: ISerializedCategoryWithProducts) {
        try {
            const response = await fetch(`/api/categories/${newCategory._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw await response.json();
            addToast(`The category "${newCategory.title.fr}" was successfully updated`, {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error(error);
            alert(`An error occured while while updating the category "${newCategory.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
        categories[index] = newCategory;
        setCategories([...categories]);
    }

    async function addCategory(newCategory: ISerializedCategoryWithProducts) {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCategory),
            });
            if (!response.ok) throw await response.json();
            newCategory._id = (await response.json())._id;
            addToast(`The category "${newCategory.title.fr}" was successfully created`, {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error(error);
            alert(`An error occured while while creating the category "${newCategory.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
        setIsAddingCategory(false);
        categories.push(newCategory);
        setCategories([...categories]);
    }

    async function deleteCategory(category: ISerializedCategoryWithProducts) {
        setCategories(categories.filter((c) => c._id !== category._id));

        try {
            const response = await fetch(`/api/categories/${category._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw await response.json();
            addToast(`The category "${category.title.fr}" was successfully deleted`, {
                appearance: 'success',
                autoDismiss: true,
            });
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
            addToast(`The product "${newProduct.title.fr}" was successfully updated`, {
                appearance: 'success',
                autoDismiss: true,
            });
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
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ categoryId: category._id, ...newProduct }),
            });
            if (!response.ok) throw await response.json();
            newProduct._id = (await response.json())._id;

            addToast(`The product "${newProduct.title.fr}" was successfully created`, {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error(error);
            alert(`An error occured while while creating the product "${newProduct.title.fr}"`);
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
            addToast(`The product "${product.title.fr}" was successfully deleted`, {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error(error);
            alert(`An error occured while while deleting the product "${product.title.fr}"`);
            alert('This page is gonna be reloaded in order to try to fix this issue');
            window.location.reload();
        }
    }

    return (
        <>
            <Head>
                <title>Admin Products - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                css={css`
                    background-color: white;
                    margin-top: 120px;
                    color: black;
                    height: 100%;
                    flex: 1;
                    padding: 20px;
                `}
            >
                <div
                    css={css`
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    `}
                >
                    <Link href="/admin/products">-> Products</Link>
                    <Link href="/admin/orders">-> Orders</Link>
                </div>

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

export const getServerSideProps: GetServerSideProps = async ({ locale, req, res }) => {
    await connectToDatabase();

    const isAdmin = await isUserAdmin(req);
    if (!isAdmin) {
        res.statusCode = 403;
        res.end(STATUS_CODES[res.statusCode]);
        return { props: {} };
    }

    return {
        props: {
            ...(await serverSideTranslations(locale!, ['common'])),
            categories: JSON.parse(JSON.stringify(await Category.find().populate('products'))),
        },
    };
};
