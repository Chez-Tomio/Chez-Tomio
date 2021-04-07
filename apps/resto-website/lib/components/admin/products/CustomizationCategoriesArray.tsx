/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { ErrorMessage, Field, FieldArray, FieldArrayRenderProps } from 'formik';
import React from 'react';

import { ImageUpload } from '../../formik/ImageUpload';

export interface CustomizationCategoriesArrayProps {
    values: any;
}

export const CustomizationCategoriesArray: React.FC<CustomizationCategoriesArrayProps> = ({
    values,
}) => {
    return (
        <FieldArray name="customizationCategories">
            {({ insert, remove, push }) => (
                <div>
                    {values.customizationCategories.length > 0 &&
                        values.customizationCategories.map((customizationCategory, index) => (
                            <div
                                className="row"
                                key={index}
                                css={css`
                                    border: 1px #000 solid;
                                `}
                            >
                                <h5>Customization Category</h5>
                                <div>
                                    <label htmlFor={`customizationCategories.${index}.title`}>
                                        Title
                                    </label>
                                    <Field
                                        name={`customizationCategories.${index}.title.fr`}
                                        placeholder="Title French"
                                    />
                                    <Field
                                        name={`customizationCategories.${index}.title.en`}
                                        placeholder="Title English"
                                    />
                                    <ErrorMessage
                                        name={`customizationCategories.${index}.title`}
                                        component="div"
                                        className="field-error"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor={`customizationCategories.${index}.minimumChoicesAmount`}
                                    >
                                        Minimum Choices Amount
                                    </label>
                                    <Field
                                        name={`customizationCategories.${index}.minimumChoicesAmount`}
                                        type="number"
                                    />
                                    <ErrorMessage
                                        name={`customizationCategories.${index}.minimumChoicesAmount`}
                                        component="div"
                                        className="field-error"
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`customizationCategories.${index}.choices`}>
                                        Choices
                                    </label>
                                    <FieldArray name="choices">
                                        {({
                                            insert: choicesInsert,
                                            remove: choicesRemove,
                                            push: choicesPush,
                                        }) => (
                                            <div>
                                                {values.customizationCategories[index].choices
                                                    .length > 0 &&
                                                    values.customizationCategories[
                                                        index
                                                    ].choices.map((extra, choiceIndex) => (
                                                        <div
                                                            className="row"
                                                            key={index}
                                                            css={css`
                                                                border: 1px #000 solid;
                                                            `}
                                                        >
                                                            <h5>Choice</h5>
                                                            <div>
                                                                <label
                                                                    htmlFor={`customizationCategories.${index}.choices.${choiceIndex}.image`}
                                                                >
                                                                    Image
                                                                </label>
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.image`}
                                                                    type="file"
                                                                    component={ImageUpload}
                                                                />
                                                                <ErrorMessage
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.image`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor={`customizationCategories.${index}.choices.${choiceIndex}.title`}
                                                                >
                                                                    Title
                                                                </label>
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.title.fr`}
                                                                    placeholder="Title French"
                                                                />
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.title.en`}
                                                                    placeholder="Title English"
                                                                />
                                                                <ErrorMessage
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.title`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor={`customizationCategories.${index}.choices.${choiceIndex}.description`}
                                                                >
                                                                    Description
                                                                </label>
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.description.fr`}
                                                                    placeholder="Description French"
                                                                    as="textarea"
                                                                    rows={3}
                                                                    css={css`
                                                                        resize: none;
                                                                    `}
                                                                />
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.description.en`}
                                                                    placeholder="Description English"
                                                                    as="textarea"
                                                                    rows={3}
                                                                    css={css`
                                                                        resize: none;
                                                                    `}
                                                                />
                                                                <ErrorMessage
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.description`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor={`customizationCategories.${index}.choices.${choiceIndex}.price`}
                                                                >
                                                                    Price
                                                                </label>
                                                                <Field
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.price`}
                                                                    type="number"
                                                                />
                                                                <ErrorMessage
                                                                    name={`customizationCategories.${index}.choices.${choiceIndex}.price`}
                                                                    component="div"
                                                                    className="field-error"
                                                                />
                                                            </div>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        choicesRemove(index)
                                                                    }
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        choicesPush({
                                                            image: '',
                                                            title: '',
                                                            description: '',
                                                            price: '',
                                                        })
                                                    }
                                                >
                                                    Add Choice
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <ErrorMessage
                                        name={`customizationCategories.${index}.choices`}
                                        component="div"
                                        className="field-error"
                                    />
                                </div>
                                <div>
                                    <button type="button" onClick={() => remove(index)}>
                                        X
                                    </button>
                                </div>
                            </div>
                        ))}
                    <button
                        type="button"
                        onClick={() =>
                            push({
                                title: '',
                                minimumChoicesAmount: '',
                                choices: [],
                            })
                        }
                    >
                        Add Customization Category
                    </button>
                </div>
            )}
        </FieldArray>
    );
};
