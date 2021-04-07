/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { ISerializedCategoryWithProducts } from '../../../database/mongo';
import { DocumentTimestamps } from '../../../database/utils';
import { ImageUpload } from '../../formik/ImageUpload';

export interface CategoriesFormProps {
    initialValues: Omit<
        ISerializedCategoryWithProducts,
        '_id' | 'products' | keyof DocumentTimestamps
    >;
    onSubmitCategory: (newCategory: ISerializedCategoryWithProducts) => void;
}

export const CategoriesForm: React.FC<CategoriesFormProps> = ({
    initialValues,
    onSubmitCategory,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            // validate={(values) => {
            //     const errors = {};

            //     if (!values.title) {
            //         errors.title = 'Required';
            //     }
            //     // if (!values.email) {
            //     //     errors.email = 'Required';
            //     // } else if (
            //     //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
            //     //         values.email,
            //     //     )
            //     // ) {
            //     //     errors.email = 'Invalid email address';
            //     // }

            //     return errors;
            // }}
            onSubmit={(values, { setSubmitting }) => {
                onSubmitCategory({
                    products: [],
                    _id: undefined as unknown,
                    createdAt: undefined as unknown,
                    updatedAt: undefined as unknown,
                    ...values,
                } as ISerializedCategoryWithProducts);
                setSubmitting(false);
            }}
        >
            {({ values, isSubmitting }) => (
                <Form
                    css={css`
                        display: flex;
                        flex-direction: column;
                        color: black;
                        .item {
                            padding: 5px;
                            display: flex;
                            flex-direction: column;
                            text-align: left;
                            * {
                                width: 100%;
                            }
                            label {
                                font-size: 0.8rem;
                            }
                        }
                    `}
                >
                    <h3>{`Editing ${values.title.fr}`}</h3>
                    <div className="item">
                        <label htmlFor="title">Title</label>
                        <Field name="title.fr" placeholder="Title French" />
                        <Field name="title.en" placeholder="Title English" />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Image</label>
                        <Field name="image" type="file" component={ImageUpload} />
                    </div>

                    <div className="item">
                        <label htmlFor="archived">Archived</label>
                        <Field
                            name="archived"
                            type="checkbox"
                            css={css`
                                width: fit-content !important;
                            `}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        css={css`
                            height: 50px;
                            cursor: pointer;
                            font-size: 1.5rem;
                            background-color: #0b5fe6;
                            color: white;
                            margin-bottom: 20px;
                        `}
                    >
                        Save
                    </button>
                </Form>
            )}
        </Formik>
    );
};
