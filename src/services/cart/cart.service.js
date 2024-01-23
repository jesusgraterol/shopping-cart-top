import Database from '../shared/database/database.service.js';

/**
 * Cart Service
 * ...
 */
class CartService {
  // the main cart record
  static #record = CartService.#buildDefaultRecord();

  static getRecord() {

  }

  static add(product) {

  }

  static increaseQuantity(productID) {

  }

  static decreaseQuantity(productID) {

  }

  static delete(productID) {

  }




  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Builds the default record object. This function is invoked when the app is initialized.
   * @returns ICartRecord
   */
  static #buildDefaultRecord() {
    return {
      totalQuantity: 0,
      totalAmount: 0,
      items: {}
    }
  }

}




/**
 * Module Exports
 */
export default CartService;