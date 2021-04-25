/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import { ISerializedProduct } from '../../../database/mongo';
import { DocumentTimestamps } from '../../../database/utils';
import { ImageUpload } from '../../formik/ImageUpload';

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
                fr: Yup.string().required('Required'),
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
                console.log(values);
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
                        <Field name="title.fr" placeholder="Title French" />
                        <ErrorMessage name="title.fr" component="span" className="error" />

                        <Field name="title.en" placeholder="Title English" />
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
                            `}
                        />
                        <ErrorMessage name="description.en" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="image">Image</label>
                        <Field name="image" component={ImageUpload} />
                        <ErrorMessage name="image" component="span" className="error" />
                    </div>

                    <div className="item">
                        <label htmlFor="basePrice">Base Price</label>
                        <Field name="basePrice" type="number" />
                        <ErrorMessage name="basePrice" component="span" className="error" />
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
                        <ErrorMessage name="isSpecialty" component="span" className="error" />
                    </div>

                    <div className="item">
                        <FieldArray name="extras">
                            {({ remove, push }) => (
                                <div>
                                    {values.extras &&
                                        values.extras.length > 0 &&
                                        values.extras.map((extra, index) => (
                                            <div
                                                className="row"
                                                key={index}
                                                css={css`
                                                    border: 1px #000 solid;
                                                    padding: 5px;
                                                `}
                                            >
                                                <h5>Extra</h5>
                                                <div>
                                                    <label htmlFor={`extras.${index}.title.fr`}>
                                                        Title
                                                    </label>
                                                    <Field
                                                        name={`extras.${index}.title.fr`}
                                                        placeholder="Title French"
                                                    />
                                                    <ErrorMessage
                                                        name={`extras.${index}.title.fr`}
                                                        component="span"
                                                        className="error"
                                                    />
                                                    <Field
                                                        name={`extras.${index}.title.en`}
                                                        placeholder="Title English"
                                                    />
                                                    <ErrorMessage
                                                        name={`extras.${index}.title.en`}
                                                        component="span"
                                                        className="error"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor={`extras.${index}.description`}>
                                                        Description
                                                    </label>
                                                    <Field
                                                        name={`extras.${index}.description.fr`}
                                                        placeholder="Description French"
                                                        as="textarea"
                                                        rows={3}
                                                        css={css`
                                                            resize: none;
                                                        `}
                                                    />
                                                    <ErrorMessage
                                                        name={`extras.${index}.description.fr`}
                                                        component="span"
                                                        className="error"
                                                    />
                                                    <Field
                                                        name={`extras.${index}.description.en`}
                                                        placeholder="Description English"
                                                        as="textarea"
                                                        rows={3}
                                                        css={css`
                                                            resize: none;
                                                        `}
                                                    />
                                                    <ErrorMessage
                                                        name={`extras.${index}.description.en`}
                                                        component="span"
                                                        className="error"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor={`extras.${index}.price`}>
                                                        Price
                                                    </label>
                                                    <Field
                                                        name={`extras.${index}.price`}
                                                        type="number"
                                                    />
                                                    <ErrorMessage
                                                        name={`extras.${index}.price`}
                                                        component="span"
                                                        className="error"
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        css={css`
                                                            cursor: pointer;
                                                            background-color: #e84c41;
                                                            color: white;
                                                            font-weight: bold;
                                                            border: none;
                                                            padding: 5px;
                                                        `}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            push({
                                                image: '',
                                                title: '',
                                                description: '',
                                                price: '',
                                            })
                                        }
                                    >
                                        Add Extra
                                    </button>
                                </div>
                            )}
                        </FieldArray>
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
                    {children}
                </Form>
            )}
        </Formik>
    );
};
