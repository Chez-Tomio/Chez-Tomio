/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, FieldArray } from 'formik';
import React from 'react';

export interface ExtrasFieldArrayProps {
    values: any;
}

export const ExtrasFieldArray: React.FC<ExtrasFieldArrayProps> = ({ values }) => {
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
                                    <label htmlFor={`extras.${index}.title`}>Title</label>
                                    <Field
                                        name={`extras.${index}.title.fr`}
                                        placeholder="Title French"
                                    />
                                    <Field
                                        name={`extras.${index}.title.en`}
                                        placeholder="Title English"
                                    />
                                    <ErrorMessage
                                        name={`extras.${index}.title`}
                                        component="div"
                                        className="field-error"
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
                                        name={`extras.${index}.description`}
                                        component="div"
                                        className="field-error"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`extras.${index}.price`}>Price</label>
                                    <Field name={`extras.${index}.price`} type="number" />
                                    <ErrorMessage
                                        name={`extras.${index}.price`}
                                        component="div"
                                        className="field-error"
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
