
import PropTypes from 'prop-types';
import ProductService from '../../services/product/product.service.js';

/**
 * Cart Item Component
 * Component in charge of managing a single cart item.
 */
function CartItem({ item, handleIncreaseQuantity, handleDecreaseQuantity, handleDeleteItem }) {

  return (
    <article>

      <img src={item.product.image} alt={item.product.title} />

      <div>
        <p className="title">{item.product.title}</p>
        <p className="subtotal">{ProductService.prettifyAmount(item.amount)}</p>

        <div className="actions-row">

          <button className="icon-btn"
                  onClick={() => handleDecreaseQuantity(item.product.id)} 
                  disabled={item.quantity === 1}>
                    <span className="md-icon">remove</span>
          </button>
          <p>{item.quantity}</p>
          <button className="icon-btn"
                  onClick={() => handleIncreaseQuantity(item.product.id)} >
                    <span className="md-icon">add</span>
          </button>

          <span className="flex-separator"></span>

          <button className="icon-btn" 
                  onClick={() => handleDeleteItem(item.product.id)}>
                    <span className="md-icon">delete</span>
          </button>

        </div>

      </div>
    </article>
  );
}
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleIncreaseQuantity: PropTypes.func.isRequired,
  handleDecreaseQuantity: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
}




/**
 * Module Exports
 */
export default CartItem;