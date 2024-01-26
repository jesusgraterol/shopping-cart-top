
import { useReducer } from 'react';
import { Outlet } from 'react-router-dom';
import {CartContext, CartDispatchContext} from '../context/cart/cart.context';
import cartReducer from '../context/cart/cart.reducer';
import Header from './header/header.component';
import CartService from '../services/cart/cart.service';

function App() {
  const [record, dispatch] = useReducer(cartReducer, {
    totalQuantity: CartService.totalQuantity,
    prettyTotalQuantity: CartService.prettyTotalQuantity,
    totalAmount: CartService.totalAmount,
    items: CartService.items
  });


  return (
    <div id="appContainer">

      <CartContext.Provider value={record}>

        <CartDispatchContext.Provider value={dispatch}>

          <Header />

          <main>

            <Outlet />
            
          </main>

        </CartDispatchContext.Provider>

      </CartContext.Provider>
      
    </div>
  )
}

export default App;
