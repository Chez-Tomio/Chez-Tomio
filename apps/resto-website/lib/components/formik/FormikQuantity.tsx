/** @jsxRuntime classic */
/** @jsx jsx */
import { Quantity } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import { FieldProps } from 'formik';
import React from 'react';

export const FormikQuantity: React.FC<FieldProps> = ({ field, form }) => {
    return (
        <Quantity
            getQuantity={(q) => {
                form.setFieldValue(field.name, q);
            }}
        ></Quantity>
    );
};
