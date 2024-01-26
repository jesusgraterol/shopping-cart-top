import Utilities from '../../services/shared/utilities/utilities.js';
import ProductService from '../../services/product/product.service.js';
import useAPIRequest from '../../hooks/api-request/api-request.hook';

/**
 * Products Component
 * ...
 */
function Products() {
  const { data, loading, error } = useAPIRequest(ProductService.listProductsAndFilters);

  return (

    <section id="productsContainer">

      <header>
        <h1>Products</h1>
        <span className="flex-separator"></span>
        <button className="icon-btn primary" disabled={loading || error}>
          <span className="md-icon">filter_alt</span>
        </button>
      </header>

      {
        loading ? (
          <div className="spinner-container">
            <div className="spinner"><div></div><div></div><div></div><div></div></div>
          </div>
        ) : error ? (
          <p className="error"><span className="md-icon">error</span> {Utilities.extractErrorMessage(error)}</p>
        ) : (
          <ul>
            <li>Some</li>
            <li>Some Cool</li>
            <li>Some Cool Products</li>
          </ul>
        )
      }

    </section>

  );
}




/**
 * Module Exports
 */
export default Products;