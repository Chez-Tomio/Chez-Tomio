/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, FieldArray, FormikErrors } from 'formik';
import React from 'react';

import { ISerializedProduct } from '../../../database/mongo';
import { DocumentTimestamps } from '../../../database/utils';

export interface ExtrasFieldArrayProps {
    values: Omit<ISerializedProduct, '_id' | keyof DocumentTimestamps>;
    errors: FormikErrors<Omit<ISerializedProduct, '_id' | keyof DocumentTimestamps>>;
}

export const ExtrasFieldArray: React.FC<ExtrasFieldArrayProps> = ({ values, errors }) => {
    return (
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
                                    <label htmlFor={`extra.title`}>Title</label>
                                    <Field name={`extra.title.fr`} placeholder="Title French" />
                                    <ErrorMessage
                                        name={`extra.title.fr`}
                                        component="span"
                                        className="error"
                                    />
                                    <Field name={`extra.title.en`} placeholder="Title English" />
                                    <ErrorMessage
                                        name={`extra.title.en`}
                                        component="span"
                                        className="error"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`extra.description`}>Description</label>
                                    <Field
                                        name={`extra.description.fr`}
                                        placeholder="Description French"
                                        as="textarea"
                                        rows={3}
                                        css={css`
                                            resize: none;
                                        `}
                                    />
                                    <ErrorMessage
                                        name={`extra.description.fr`}
                                        component="span"
                                        className="error"
                                    />
                                    <Field
                                        name={`extra.description.en`}
                                        placeholder="Description English"
                                        as="textarea"
                                        rows={3}
                                        css={css`
                                            resize: none;
                                        `}
                                    />
                                    <ErrorMessage
                                        name={`extra.description.en`}
                                        component="span"
                                        className="error"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`extra.price`}>Price</label>
                                    <Field name={`extra.price`} type="number" />
                                    <ErrorMessage
                                        name={`extra.price`}
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
    );
};
