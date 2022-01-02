import { Dispatch } from 'react';

import { ProductDTO } from '../../api/dto/checkout';

export interface GlobalStateInterface {
    cartItems: ProductDTO[];
}

export type ActionType = {
    type: string;
    payload?: any;
};

export type ContextType = {
    globalState: GlobalStateInterface;
    dispatch: Dispatch<ActionType>;
};

const Reducer = (state: GlobalStateInterface, action: ActionType): any => {
    switch (action.type) {
        case 'SET_CART_PRODUCTS':
            return {
                ...state,
                cartItems: action.payload,
            };
        case 'PURGE_STATE':
            return initialState;
        default:
            return state;
    }
};

export default Reducer;

// import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

// import { ProductDTO } from '../../api/dto/checkout';

// export interface GlobalStateInterface {
//     cartItems: ProductDTO[];
// }

// export const GlobalStateContext = createContext({
//     globalState: {} as Partial<GlobalStateInterface>,
//     setGlobalState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
// });

// // export const GlobalStateProvider = ({
// //     children,
// //     value = {} as GlobalStateInterface,
// // }: {
// //     children: React.ReactNode;
// //     value?: Partial<GlobalStateInterface>;
// // }) => {
// //     const [state, setState] = useState(value);
// //     return (
// //         <GlobalStateContext.Provider value={{ state, setState }}>
// //             {children}
// //         </GlobalStateContext.Provider>
// //     );
// // };

// export const useGlobalState = () => {
//     const context = useContext(GlobalStateContext);
//     if (!context) {
//         throw new Error('useGlobalState must be used within a GlobalStateContext');
//     }
//     return context;
// };

// import PropTypes from 'prop-types';
// import React, { useReducer } from 'react';

// export const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS';

// /**
//  * Global state inital state
//  */
// export const initialGlobalState = {
//     cartItems: [],
// };

// /**
//  * Global state reducer
//  */
// const globalStateReducer = (state, action) => {
//     const { type, payload } = action;
//     switch (type) {
//         case SET_CART_PRODUCTS: {
//             return {
//                 ...state,
//                 cartItems: payload,
//             };
//         }

//         default:
//             return state;
//     }
// };

// /**
//  * Global state context
//  */
// export const GlobalStateContext = React.createContext({
//     globalState: initialGlobalState,
//     globalDispatch: ({ type, payload }) => null,
// });

// /**
//  * Global state provider
//  */
// export const GlobalStateProvider: React.FC = ({ children }) => {
//     const [globalState, globalDispatch] = useReducer(globalStateReducer, initialGlobalState);

//     return (
//         <GlobalStateContext.Provider value={[globalState, globalDispatch] as any}>
//             {children}
//         </GlobalStateContext.Provider>
//     );
// };

// // GlobalState.propTypes = {
// //     initialState: PropTypes.object.isRequired,
// //     dispatch: PropTypes.func.isRequired,
// //     children: PropTypes.node,
// // };

// // export default GlobalState;
