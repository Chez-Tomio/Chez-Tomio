/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState } from 'react';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import { CategoriesForm } from '../../lib/components/admin/products/CategoriesForm';
import { Category } from '../../lib/components/admin/products/Category';
import { ProductRow } from '../../lib/components/admin/products/ProductRow';
import { ProductsForm } from '../../lib/components/admin/products/ProductsForm';
import { ICategory } from '../../lib/database/models/category';
import { IProduct } from '../../lib/database/models/product';

interface CategoryProps {
    category: ICategory;
    onSubmitCategory: (newCategory: ICategory) => void;
}

export const Category: React.FC<CategoryProps> = ({ category, onSubmitCategory }) => {
    const [isEditingCategory, setIsEditingCategory] = useState(false);

    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [products, setProducts] = useState(category.products);

    function updateCategory(newCategoryData: ICategory) {
        categories[index] = newCategoryData;
        setCategories([...categories]);
        // POST category to database
    }

    function updateProduct(index: number, newProductData: IProduct) {
        products[index] = newProductData;
        setProducts([...products]);
        // PUT product to database
    }

    function addProduct(newProductData: IProduct) {
        setIsAddingProduct(false);
        products.push(newProductData);
        setProducts([...products]);
        console.log(newProductData);
        // POST product to database
    }

    return (
        <>
            <h3>
                {category.title.fr} / {category.title.en}
            </h3>
            <table
                css={css`
                    width: 100%;
                    border-collapse: collapse;
                    th,
                    td {
                        border: 1px #000 solid;
                        padding: 5px;
                    }
                `}
            >
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Base Price</th>
                        <th>Speciality</th>
                        <th>Extras</th>
                        <th>Archived</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {category.products.map((p, i) => (
                        <ProductRow
                            key={p._id}
                            product={p}
                            onSubmitProduct={(newProduct) => updateProduct(i, newProduct)}
                        />
                    ))}
                </tbody>
            </table>
            <Popup
                open={isAddingProduct}
                closeOnDocumentClick
                onClose={() => setIsAddingProduct(false)}
                contentStyle={{ overflowY: 'scroll', margin: '30px auto' }}
            >
                <ProductsForm
                    initialValues={{
                        title: { fr: '', en: '' },
                        description: { fr: '', en: '' },
                        image: '',
                        basePrice: 0,
                        isSpecialty: false,
                        extras: [],
                        archived: false,
                    }}
                    onSubmitProduct={addProduct}
                ></ProductsForm>
            </Popup>
            <button
                css={css`
                    font-weight: bold;
                    padding: 5px;
                    float: right;
                    cursor: pointer;
                `}
                onClick={() => setIsAddingProduct(true)}
            >
                Add Product
            </button>
        </>
    );
};
