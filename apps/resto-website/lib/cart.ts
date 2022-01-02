import { useContext } from 'react';

import { ProductDTO } from './api/dto/checkout';
import {
    GlobalDispatchContext,
    GlobalStateContext,
    SET_CART_PRODUCTS,
} from './components/common/GlobalState';

const globalState = useContext(GlobalStateContext);
const globalDispatch = useContext(GlobalDispatchContext);

export function updateCartWithLocalStorage() {
    const localStorageCartProducts = localStorage.getItem('cartProducts');
    if (localStorageCartProducts) {
        const data = JSON.parse(localStorageCartProducts);
        globalDispatch({ type: SET_CART_PRODUCTS, payload: data });
    }
}

export function addToCart(data: ProductDTO) {
    const productsArray: ProductDTO[] = globalState.cartItems;

    // TODO: Check if there are diffrent options
    // If product is already in cart just add more to count
    // let productIsInCart = false;
    // productsArray.forEach((p, i) => {
    //     if (p.id === data.id) {
    //         productIsInCart = true;
    //         p.count += data.count;
    //     }
    // });
    // if (!productIsInCart) {
    //     productsArray.push(data);
    // }

    productsArray.push(data);

    globalDispatch({ type: SET_CART_PRODUCTS, payload: productsArray });
    localStorage.setItem('cartProducts', JSON.stringify(productsArray));
}
