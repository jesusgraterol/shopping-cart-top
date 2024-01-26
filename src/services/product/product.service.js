import Utilities from '../shared/utilities/utilities.js';
import RequestService from '../shared/request/request.service.js';

/**
 * Product Service
 * Service in charge of handling interactions with the FakeStore API as well as processing its data.
 */
class ProductService {
  // the FakeStore API's URL
  static #BASE_PATH = 'https://fakestoreapi.com';

  /**
   * Retrieves all the products from the API and builds the filters that can be applied.
   * @returns Promise<{ products: IProduct[], filters: string[] }> 
   */
  static async listProductsAndFilters() {
    // extract the list of products from the API
    const products = await ProductService._listProducts();
    
    // return the products and the filters
    return { 
      products: products,
      filters: ProductService.#listFilters(products)
    }
  }

  /**
   * Filters a list of products based on the active filter.
   * @param {*} products 
   * @param {*} filter 
   * @returns IProduct[]
   */
  static filterProducts(products, filter) {
    if (Array.isArray(products)) {
      if (filter === 'All') {
        return products;
      } else {
        return products.filter((p) => p.category.toLowerCase() === filter.toLowerCase());
      }
    } else {
      return [];
    }
  }

  /**
   * Retrieves the complete list of products from the API.
   * @returns Promise<IProduct[]>
   * IMPORTANT: This method is supposed to be named #listProducts and be private. Unfortunately, 
   * Jest does not support mocking this kind of function and it had to be renamed so testing could 
   * be performed properly.
   */
  static async _listProducts() {
    const { data } = await RequestService.get(`${ProductService.#BASE_PATH}/products`, { 
      retryAttempts: 3 
    });
    return data;
  }

  /**
   * Extracts the list of filters based on the given list of products.
   * @param {*} products 
   * @returns string[]
   */
  static #listFilters(products) {
    return ['All', ...new Set(products.map(p => Utilities.capitalizeWords(p.category))).values()];
  }
}




/**
 * Module Exports
 */
export default ProductService;