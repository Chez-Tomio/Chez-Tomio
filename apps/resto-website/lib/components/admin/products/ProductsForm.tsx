/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { ISerializedProduct } from '../../../database/mongo';
import { DocumentTimestamps } from '../../../database/utils';
import { ImageUpload } from '../../formik/ImageUpload';
import { ExtrasFieldArray } from './ExtrasFieldArray';

const ProductsFormSchema = Yup.object().shape({
    title: Yup.object().shape({
        fr: Yup.string().required('Required'),
        en: Yup.string().required('Required'),
    }),
    description: Yup.object().shape({
        fr: Yup.string(),
        en: Yup.string(),
    }),
    image: Yup.string(),
    basePrice: Yup.number().required('Required'),
    isSpecialty: Yup.boolean(),
    extras: Yup.array().of(
        Yup.object().shape({
            title: Yup.object().shape({
                fr: Yup.number().required('Required'),
                en: Yup.string().required('Required'),
            }),
            description: Yup.object().shape({
                fr: Yup.string(),
                en: Yup.string(),
            }),
            price: Yup.number().required('Required'),
        }),
    ),
    archived: Yup.boolean(),
});

export interface ProductsFormProps {
    initialValues: Omit<ISerializedProduct, '_id' | keyof DocumentTimestamps>;
    onSubmitProduct: (newProduct: ISerializedProduct) => void;
}

export const ProductsForm: React.FC<ProductsFormProps> = ({
    children,
    initialValues,
    onSubmitProduct,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={ProductsFormSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmitProduct({
                    _id: undefined as unknown,
                    createdAt: undefined as unknown,
                    updatedAt: undefined as unknown,
                    ...values,
                } as ISerializedProduct);
                setSubmitting(false);
            }}
        >
            {({ values, isSubmitting, errors }) => (
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
                                font-size: 0.9rem;
                            }
                            .error {
                                color: red;
                                font-size: 0.7rem;
                                margin-bottom: 15px;
                            }
                        }
                    `}
                >
                    <h3>{`Editing ${values.title.fr}`}</h3>
                    <div className="item">
                        <label htmlFor="title">Title</label>
                        <Field
                            name="title.fr"
                            placeholder="Title French"
                            css={css`
                                border: ${errors.title && (errors.title.fr ? 'red 2px solid' : '')};
                            `}
                        />
                        <ErrorMessage name="title.fr" component="span" className="error" />

                        <Field
                            name="title.en"
                            placeholder="Title English"
                            css={css`
                                border: ${errors.title && (errors.title.en ? 'red 2px solid' : '')};
                            `}
                        />
                        <ErrorMessage name="title.en" component="span" className="error" />
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
                                border: ${errors.description &&
                                (errors.description.fr ? 'red 2px solid' : '')};
                            `}
                        />
                        <ErrorMessage name="description.fr" component="span" className="error" />

                        <Field
                            name="description.en"
                            placeholder="Description English"
                            as="textarea"
                            rows={3}
                            css={css`
                                resize: none;
                                border: ${errors.description &&
                                (errors.description.en ? 'red 2px solid' : '')};
                            `}
                        />
                        <ErrorMessage name="description.en" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Image</label>
                        <Field
                            name="image"
                            type="file"
                            component={ImageUpload}
                            css={css`
                                border: ${errors.image ? 'red 2px solid' : ''};
                            `}
                        />
                        <ErrorMessage name="image" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="basePrice">Base Price</label>
                        <Field
                            name="basePrice"
                            type="number"
                            css={css`
                                border: ${errors.basePrice ? 'red 2px solid' : ''};
                            `}
                        />
                        <ErrorMessage name="basePrice" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="isSpecialty">Specialty</label>
                        <Field
                            name="isSpecialty"
                            type="checkbox"
                            css={css`
                                width: fit-content !important;
                                border: ${errors.isSpecialty ? 'red 2px solid' : ''};
                            `}
                        />
                        <ErrorMessage name="isSpecialty" component="span" className="error" />
                    </div>

                    <div className="item">
                        <ExtrasFieldArray values={values} errors={errors}></ExtrasFieldArray>
                    </div>

                    <div className="item">
                        <label htmlFor="archived">Archived</label>
                        <Field
                            name="archived"
                            type="checkbox"
                            css={css`
                                width: fit-content !important;
                                border: ${errors.archived ? 'red 2px solid' : ''};
                            `}
                        />
                        <ErrorMessage name="archived" component="span" className="error" />
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
                    {children}
                </Form>
            )}
        </Formik>
    );
};
