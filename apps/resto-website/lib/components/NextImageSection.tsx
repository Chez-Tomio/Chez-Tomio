/** @jsxRuntime classic */
/** @jsx jsx */
import { ImageSectionProps } from '@chez-tomio/components-web';
import { css, jsx } from '@emotion/react';
import dynamic from 'next/dynamic';
import React from 'react';

const ImageSection = dynamic(
    () => import('@chez-tomio/components-web').then((componentsWeb) => componentsWeb.ImageSection),
    { ssr: false },
);

export const NextImageSection: React.FC<ImageSectionProps> = (props) => (
    <ImageSection {...props}></ImageSection>
);
