/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { ISerializedCategoryWithProducts } from '../../../database/mongo';
import { DocumentTimestamps } from '../../../database/utils';
import { ImageUpload } from '../../formik/ImageUpload';

const CategoriesFormSchema = Yup.object().shape({
    title: Yup.object().shape({
        fr: Yup.string().required('Required'),
        en: Yup.string().required('Required'),
    }),
    image: Yup.string().required('Required'),
    archived: Yup.boolean(),
});

export interface CategoriesFormProps {
    initialValues: Omit<
        ISerializedCategoryWithProducts,
        '_id' | 'products' | 'slug' | keyof DocumentTimestamps
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
            validationSchema={CategoriesFormSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmitCategory({
                    products: [],
                    _id: undefined as unknown,
                    slug: undefined as unknown,
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
                        <Field name="title.fr" placeholder="Title French" />
                        <ErrorMessage name="title.fr" component="span" className="error" />
                        <Field name="title.en" placeholder="Title English" />
                        <ErrorMessage name="title.en" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Image</label>
                        <Field name="image" type="file" component={ImageUpload} />
                        <ErrorMessage name="image" component="span" className="error" />
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
                </Form>
            )}
        </Formik>
    );
};
