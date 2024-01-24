import NumberUtilities from '../shared/number/number.utilities.js';
import Database from '../shared/database/database.service.js';

/**
 * Cart Service
 * Service in charge of handling all the operations that can be performed in the shopping cart.
 */
class CartService {
  // the key used to store the cart record in the db
  static #DB_KEY = 'cartRecord';

  // the main cart record
  static #record;





  /* *********
   * GETTERS *
   ********* */

  static get totalQuantity() {
    return CartService.#record.totalQuantity;
  }

  static get totalAmount() {
    return CartService.#record.totalAmount;
  }

  static get items() {
    return Object.values(CartService.#record.items);
  }





  /* **************
   * CART ACTIONS *
   ************** */

  /**
   * Adds a product to the cart.
   * @param {*} product 
   */
  static add(product) {
    // validate the request
    if (CartService.#record.items[product.id]) {
      throw new Error(`The product with an ID of: ${product.id} cannot be added to the cart because it already exists.`);
    }

    // add product to the items obj
    CartService.#record.items[product.id] = { quantity: 1, amount: product.price, product: product };

    // trigger the on change event
    CartService.#onCartChanges();
  }

  /**
   * Increases the quantity for a given product on the cart.
   * @param {*} productID 
   */
  static increaseQuantity(productID) {
    // validate the request
    if (!CartService.#record.items[productID]) {
      throw new Error(`The quantity of the product ID ${productID} cannot be increased because it is not in the cart.`);
    }

    // increase the quantity and recalculate the amount
    CartService.#record.items[productID].quantity += 1;
    CartService.#record.items[productID].amount = CartService.#calculateItemAmount(
      CartService.#record.items[productID].product.price,
      CartService.#record.items[productID].quantity
    );

    // trigger the on change event
    CartService.#onCartChanges();
  }

  /**
   * Decreases the quantity for a given product on the cart.
   * @param {*} productID 
   */
  static decreaseQuantity(productID) {
    // validate the request
    if (!CartService.#record.items[productID]) {
      throw new Error(`The quantity of the product ID ${productID} cannot be decreased because it is not in the cart.`);
    }
    if (CartService.#record.items[productID].quantity === 1) {
      throw new Error(`The quantity of the product ID ${productID} cannot be decreased because there is only one in the cart. Delete the item instead.`);
    }

    // increase the quantity and recalculate the amount
    CartService.#record.items[productID].quantity -= 1;
    CartService.#record.items[productID].amount = CartService.#calculateItemAmount(
      CartService.#record.items[productID].product.price,
      CartService.#record.items[productID].quantity
    );

    // trigger the on change event
    CartService.#onCartChanges();
  }

  /**
   * Fully removes a product from the cart.
   * @param {*} productID 
   */
  static delete(productID) {
    // validate the request
    if (!CartService.#record.items[productID]) {
      throw new Error(`The product ID ${productID} cannot be deleted because it is not in the cart.`);
    }

    // delete the item from the record
    delete CartService.#record.items[productID];


    // trigger the on change event
    CartService.#onCartChanges();
  }





  /* ***************
   * EVENT HANDLER *
   *************** */

  /**
   * Triggers whenever the cart experiences a change of any kind and recalculates the total items
   * in the cart as well as the dollar amount.
   */
  static #onCartChanges() {
    // calculate the new totals
    const { totalQuantity, totalAmount } = Object.values(CartService.#record.items).reduce(
      (accum, current) => {
        accum.totalQuantity += current.quantity;
        accum.totalAmount = accum.totalAmount.plus(current.amount);
        return accum;
      },
      { totalQuantity: 0, totalAmount: NumberUtilities.getBigNumber(0) }
    );

    // set the new totals
    CartService.#record.totalQuantity = totalQuantity;
    CartService.#record.totalAmount = NumberUtilities.buildNumber(totalAmount);

    // finally, update the record
    Database.write(CartService.#DB_KEY, CartService.#record);
  }





  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Initializes the cart record in case it hasn't been. If no data is found in the db, it builds
   * the default record object.
   */
  static initializeRecord() {
    if (!CartService.#record) {
      CartService.#record = Database.read(CartService.#DB_KEY) || CartService.#buildDefaultRecord();
    }
  }

  /**
   * Builds the default record object. This function is invoked when the app is initialized.
   * @returns ICartRecord
   */
  static #buildDefaultRecord() {
    return { totalQuantity: 0, totalAmount: 0, items: {} }
  }

  /**
   * Calculates the dollar amount for an item based on the product price and quantity.
   * @param {*} price 
   * @param {*} quantity 
   * @returns number
   */
  static #calculateItemAmount(price, quantity) {
    return NumberUtilities.buildNumber(NumberUtilities.getBigNumber(price).times(quantity));
  }

  /**
   * Prettifies a given dollar amount so it can be displayed to users.
   * @param {*} amount 
   * @returns string
   */
  static prettifyAmount(amount) {
    return NumberUtilities.prettifyNumber(amount, { prefix: '$' });
  }
}



/**
 * Initialize the Cart Record
 */
CartService.initializeRecord();



/**
 * Module Exports
 */
export default CartService;