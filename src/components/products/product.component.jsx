
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities.js';
import CartService from '../../services/cart/cart.service.js';

/**
 * Product Component
 * ...
 */
function Product({ product }) {

  return (
    <article>
      <img src={product.image} />
      <h2>{Utilities.truncateText(product.title, 40)}</h2>
      <h3>{CartService.prettifyAmount(product.price)}</h3>
      <span className="flex-separator"></span>
      <button className="btn primary">Add to cart</button>
      <button className="btn">More info</button>
    </article>
  );
}
Product.propTypes = {
  product: PropTypes.object.isRequired
}



/**
 * Module Exports
 */
export default Product;