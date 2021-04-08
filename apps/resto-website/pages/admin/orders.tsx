/** @jsxRuntime classic */
/** @jsx jsx */
import { Button, ImageSection, WhiteSection } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { STATUS_CODES } from 'http';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { isUserAdmin } from '../../lib/api/utils';
import { Category, connectToDatabase, ISerializedOrderWithUser } from '../../lib/database/mongo';

export default function AdminOrders() {
    const [perPage, setPerPage] = useState(3);
    const [pageNumber, setPageNumber] = useState(0);
    const [orders, setOrders] = useState<ISerializedOrderWithUser[]>();
    const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);

    useEffect(() => {
        fetchNextOrderPage(0);
    }, []);

    async function fetchNextOrderPage(page: number) {
        try {
            const response = await fetch(`/api/orders?perPage=${perPage}&pageNumber=${page}`);
            if (!response.ok) throw await response.json();
            const data = await response.json();
            setOrders(data.orders);
            setPageNumber(page);
            setTotalNumberOfPages(data.totalNumberOfPages);
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    function handlePageClick(data) {
        const selected: number = data.selected;
        fetchNextOrderPage(selected);
    }

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
                    <Link href="/admin/products">-&gt; Products</Link>
                    <Link href="/admin/orders">-&gt; Orders</Link>
                </div>

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
                            <th>Date</th>
                            <th>Payment Status</th>
                            <th>Total</th>
                            <th>User</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((o) => (
                            <tr key={o._id}>
                                <td>{o.createdAt}</td>
                                <td>{o.paymentStatus}</td>
                                <td>{o.products.map((p) => p.title.fr).join(', ')}</td>
                                <td>{o.user?.email}</td>
                                <td>{o.contactPhoneNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div
                    css={css`
                        .pagination {
                            display: flex;
                            list-style: none;
                            * {
                                margin: 5px;
                                cursor: pointer;
                            }
                            .active {
                                background-color: #0b5fe6 !important;
                                color: white;
                            }
                        }
                    `}
                >
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={totalNumberOfPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={perPage}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
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
        },
    };
};
