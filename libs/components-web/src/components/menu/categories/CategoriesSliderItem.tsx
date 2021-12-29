import styled from '@emotion/styled';

export interface CategoriesSliderItemProps {
    active?: boolean;
}

export const CategoriesSliderItem = styled.div<CategoriesSliderItemProps>`
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    background-color: ${(props) => (props.active ? 'black' : 'white')};
    color: ${(props) => (props.active ? 'white' : 'black')};
    border: 3px black solid;
    padding: 10px;
    cursor: pointer;
    margin: 0 5px;
    border-radius: 10px;
`;
