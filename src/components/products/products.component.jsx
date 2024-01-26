import { useState } from 'react';
import Utilities from '../../services/shared/utilities/utilities.js';
import ProductService from '../../services/product/product.service.js';
import useAPIRequest from '../../hooks/api-request/api-request.hook';
import ProductFilters from './product-filters.component.jsx';
import Product from './product.component.jsx';
import './products.css';

/**
 * Products Component
 * Component in charge of displaying all available products as well as filtering them.
 */
function Products() {
  const { data, loading, error } = useAPIRequest(ProductService.listProductsAndFilters);
  const [ activeFilter, setActiveFilter ] = useState('All');


  const filteredProducts = ProductService.filterProducts(data?.products, activeFilter);


  const handleFilterClick = (newFilter) => setActiveFilter(newFilter);


  return (

    <section id="productsContainer">

      <header>

        <h1>Products</h1>

        <span className="flex-separator"></span>

        <ProductFilters filterList={data?.filters || []} 
                        activeFilter={activeFilter} 
                        handleFilterClick={handleFilterClick} 
                        disabled={loading || error !== null}/>

      </header>

      {
        loading ? (
          <div className="spinner-container">
            <div className="spinner"><div></div><div></div><div></div><div></div></div>
          </div>
        ) : error ? (
          <p className="error">
            <span className="md-icon">error</span> {Utilities.extractErrorMessage(error)}
          </p>
        ) : (
          <div className="grid">
            {filteredProducts.map((product) => <Product key={product.id} product={product} />)}
          </div>
        )
      }

    </section>

  );
}




/**
 * Module Exports
 */
export default Products;