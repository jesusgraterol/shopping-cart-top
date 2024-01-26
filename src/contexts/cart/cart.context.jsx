import { createContext } from 'react';


/**
 * Cart Context
 * The following provides context for the cart record as well as the dispatch function.
 */

const CartContext = createContext(null);

const CartDispatchContext = createContext(null);


/**
 * Module Exports
 */
export { CartContext, CartDispatchContext };