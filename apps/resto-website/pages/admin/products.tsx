/** @jsxRuntime classic */
/** @jsx jsx */
import 'reactjs-popup/dist/index.css';

import { css, jsx } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { ProductRow } from '../../lib/components/admin/products/ProductRow';
import { ProductsForm } from '../../lib/components/admin/products/ProductsForm';
import { IProduct } from '../../lib/database/models/product';

export default function Admin({ products: initialProducts }: { products: IProduct[] }) {
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [products, setProducts] = useState(initialProducts);

    function updateProduct(index: number, newProductData: IProduct) {
        products[index] = newProductData;
        setProducts([...products]);
        // Save in database

        // PUT product to database
    }

    function addProduct(newProductData: IProduct) {
        setIsAddingProduct(false);
        products.push(newProductData);
        setProducts([...products]);
        console.log(newProductData);
        // POST product to database (Unspecified fields are not in newProductData)
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
                    `}
                >
                    Products
                </h2>

                <h3>Category 1</h3>
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
                            <th>Minimum Price</th>
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
                                onUpdateProduct={(newProduct) => updateProduct(i, newProduct)}
                            />
                        ))}
                    </tbody>
                </table>
                <button
                    css={css`
                        font-weight: bold;
                        padding: 5px;
                    `}
                >
                    Add Category
                </button>
                <Popup
                    open={isAddingProduct}
                    closeOnDocumentClick
                    onClose={() => setIsAddingProduct(false)}
                    contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
                >
                    <ProductsForm initialValues={{}} onUpdateProduct={addProduct}></ProductsForm>
                </Popup>
                <button
                    css={css`
                        font-weight: bold;
                        padding: 5px;
                    `}
                    onClick={() => setIsAddingProduct(true)}
                >
                    Add Product
                </button>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common'])),
        products: [
            {
                _id: '41231',
                title: { fr: '', en: '' },
                description: { fr: '', en: '' },
                image: '',
                basePrice: 0,
                minimumPrice: 0,
                isSpecialty: false,
                extras: [],
                archived: false,
            },
        ],
    },
});
