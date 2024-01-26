import { useContext } from 'react';
import { CartContext, CartDispatchContext } from '../../contexts/cart/cart.context';
import ProductService from '../../services/product/product.service.js';
import CartService from '../../services/cart/cart.service.js';
import CartItem from './cart-item.component';
import './cart.css';

/**
 * Cart Component
 * Component in charge of displaying and managing the Cart's contents.
 */
function Cart() {
  const { totalQuantity, totalAmount, items } = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);


  // event handlers

  const handleIncreaseQuantity = (productID) => {
    CartService.increaseQuantity(productID);
    dispatch(CartService.reducerObject);
  }

  const handleDecreaseQuantity = (productID) => {
    CartService.decreaseQuantity(productID);
    dispatch(CartService.reducerObject);
  }

  const handleDeleteItem = (productID) => {
    CartService.delete(productID);
    dispatch(CartService.reducerObject);
  }



  return (
    <section id="cartContainer">
      <header>
        <h1>Cart</h1>
      </header>

      <div>

      {items.length === 0 ? (
        <p className="no-items-found">No items were found</p>
      ) : (
        <div className="cart">

          <div className="inner">
            <header>
              <h2>{totalQuantity} Items</h2>

              <span className="flex-separator"></span>

              <h2>{ProductService.prettifyAmount(totalAmount)}</h2>
            </header>

            <div className="items">
              {items.map(item => <CartItem  key={item.product.id} 
                                            item={item}
                                            handleIncreaseQuantity={handleIncreaseQuantity}
                                            handleDecreaseQuantity={handleDecreaseQuantity}
                                            handleDeleteItem={handleDeleteItem} />)}
            </div>

            <footer>
              <button className="btn primary">CHECKOUT</button>
            </footer>
          </div>

        </div>
      )}

      </div>

    </section>
  );
}




/**
 * Module Exports
 */
export default Cart;