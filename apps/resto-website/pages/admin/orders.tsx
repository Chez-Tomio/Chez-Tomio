/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Admin() {
    return (
        <>
            <Head>
                <title>Admin Orders - Chez Tomio</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div
                css={css`
                    background-color: white;
                    margin-top: 120px;
                    color: black;
                    height: 100%;
                    flex: 1;
                `}
            >
                <h2
                    css={css`
                        font-size: 2.4rem;
                        padding: 10px;
                    `}
                >
                    Orders
                </h2>

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
                            <th>#</th>
                            <th>Products</th>
                            <th>User</th>
                            <th>Phone</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {products.map((p, i) => (
                            <ProductRow
                                key={p._id}
                                product={p}
                                onUpdateProduct={(newProduct) => updateProduct(i, newProduct)}
                                onDeleteProduct={() => deleteProduct(p)}
                            />
                        ))} */}
                    </tbody>
                </table>
            </div>
        </>
    );
}
