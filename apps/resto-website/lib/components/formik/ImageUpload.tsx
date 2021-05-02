/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { FieldProps } from 'formik';
import React from 'react';

export const ImageUpload: React.FC<FieldProps> = ({ field, form }) => {
    return (
        <>
            <img
                src={field.value}
                css={css`
                    max-width: 200px;
                `}
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.currentTarget.files && e.currentTarget.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            form.setFieldValue(field.name, reader.result);
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
        </>
    );
};
