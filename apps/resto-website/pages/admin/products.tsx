/** @jsxRuntime classic */
/** @jsx jsx */
import 'reactjs-popup/dist/index.css';

import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { CategoriesForm } from '../../lib/components/admin/products/CategoriesForm';
import { Category } from '../../lib/components/admin/products/Category';
import { ICategory } from '../../lib/database/models/category';

export default function Admin({ categories: initialCategories }: { categories: ICategory[] }) {
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [categories, setCategories] = useState(initialCategories);

    function addCategory(newCategoryData: ICategory) {
        setIsAddingCategory(false);
        categories.push(newCategoryData);
        setCategories([...categories]);
        console.log(newCategoryData);
        // POST category to database
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
                        margin-bottom: 20px;
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
                    ></CategoriesForm>
                </Popup>
                <button
                    css={css`
                        font-weight: bold;
                        padding: 5px;
                        cursor: pointer;
                    `}
                    onClick={() => setIsAddingCategory(true)}
                >
                    Add Category
                </button>

                {categories.map((c, i) => (
                    <Category
                        key={c._id}
                        category={c}
                        onSubmitCategory={(newCategory) => updateCategory(i, newCategory)}
                    ></Category>
                ))}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale!, ['common'])),
        categories: [
            {
                title: { fr: '', en: '' },
                image: '',
                products: [
                    {
                        _id: '41231',
                        title: { fr: '', en: '' },
                        description: { fr: '', en: '' },
                        image: '',
                        basePrice: 0,
                        isSpecialty: false,
                        extras: [],
                        archived: false,
                    },
                ],
                archived: false,
            },
        ],
    },
});
