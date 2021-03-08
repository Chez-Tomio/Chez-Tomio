/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const headerSpaceStyles = css`
    flex: 1;
`;

export const HeaderSpace: React.FC = () => <div css={headerSpaceStyles} />;
