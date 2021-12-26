import PropTypes from 'prop-types';
import React from 'react';

export const GlobalStateContext = React.createContext(null as any);
export const GlobalDispatchContext = React.createContext(null as any);

export const SET_CART_ITEMS = 'SET_CART_ITEMS';

export const reducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_CART_ITEMS: {
            return {
                ...state,
                cartItems: payload,
            };
        }

        default:
            return state;
    }
};

function GlobalState(props) {
    const { initialState, dispatch } = props;
    return (
        <GlobalStateContext.Provider value={initialState}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {props.children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
}

GlobalState.propTypes = {
    initialState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
};

export default GlobalState;
