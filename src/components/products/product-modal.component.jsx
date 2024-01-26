import PropTypes from 'prop-types';
import Modal from '../shared/modal/modal.component.jsx';
import ProductService from '../../services/product/product.service.js';

/**
 * Product Modal Component
 * Component in charge of displaying the details of a specific product. 
 */
function ProductModal({ product, setModal }) {

  const handleCloseModal = () => setModal(false);

  return (
    <Modal closeModal={handleCloseModal}>

      <header>

        <h2>{ProductService.prettifyAmount(product.price)}</h2>

        <button className="icon-btn" aria-label="Close Modal" onClick={handleCloseModal}>
          <span aria-hidden="true" className="md-icon">close</span>
        </button>

      </header>

      <article className="product-modal-details">

        <img src={product.image} alt={product.title} />

        <h2>{product.title}</h2>

        <p>{product.description}</p>
        
      </article>

    </Modal>
  );
}
ProductModal.propTypes = {
  product: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
};



/**
 * Module Exports
 */
export default ProductModal;