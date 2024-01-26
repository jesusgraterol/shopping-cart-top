
import { useState } from 'react';
import PropTypes from 'prop-types';
import Utilities from '../../services/shared/utilities/utilities.js';
import ProductService from '../../services/product/product.service.js';
import ProductModal from './product-modal.component.jsx';

/**
 * Product Component
 * Component in charge of handling a product's card
 */
function Product({ product }) {
  const [modal, setModal] = useState(false);

  
  const handleMoreInfoClick = () => setModal(true);



  return (
    <>
      <article>

        <img src={product.image} alt={product.title} />

        <h2>{Utilities.truncateText(product.title, 40)}</h2>

        <h3>{ProductService.prettifyAmount(product.price)}</h3>

        <span className="flex-separator"></span>

        <button className="btn primary">Add to cart</button>

        <button className="btn" onClick={handleMoreInfoClick}>More info</button>

      </article>
    
      {modal && <ProductModal product={product} setModal={setModal} />}
    </>

  );
}
Product.propTypes = {
  product: PropTypes.object.isRequired
}



/**
 * Module Exports
 */
export default Product;