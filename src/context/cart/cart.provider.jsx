/* import { useReducer } from 'react';
import PropTypes from 'prop-types';
import cartReducer from './cart.reducer';


function CartProvider({ children }) {
  const [record, dispatch] = useReducer(
    cartReducer,
    initialRecord
  );

  return (
    <CartContext.Provider value={record}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
}
CartProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default CartProvider; */