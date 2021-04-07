/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { IProduct } from '../../../database/mongo';
import { ImageUpload } from '../../formik/ImageUpload';
import { ExtrasFieldArray } from './ExtrasFieldArray';

export interface ProductsFormProps {
    initialValues: IProduct;
    onSubmitProduct: (newProduct: IProduct) => void;
}

export const ProductsForm: React.FC<ProductsFormProps> = ({ initialValues, onSubmitProduct }) => {
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
                onSubmitProduct(values);
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
                        <label htmlFor="description">Description</label>
                        <Field
                            name="description.fr"
                            placeholder="Description French"
                            as="textarea"
                            rows={3}
                            css={css`
                                resize: none;
                            `}
                        />
                        <Field
                            name="description.en"
                            placeholder="Description English"
                            as="textarea"
                            rows={3}
                            css={css`
                                resize: none;
                            `}
                        />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Image</label>
                        <Field name="image" type="file" component={ImageUpload} />
                    </div>

                    <div className="item">
                        <label htmlFor="basePrice">Base Price</label>
                        <Field name="basePrice" type="number" />
                    </div>

                    <div className="item">
                        <label htmlFor="isSpecialty">Specialty</label>
                        <Field
                            name="isSpecialty"
                            type="checkbox"
                            css={css`
                                width: fit-content !important;
                            `}
                        />
                    </div>

                    <div className="item">
                        <ExtrasFieldArray values={values}></ExtrasFieldArray>
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
