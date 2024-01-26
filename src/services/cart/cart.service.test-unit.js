import NumberUtilities from '../shared/number/number.utilities.js';
import CartService from './cart.service.js';
import { MOCK_PRODUCTS } from './test-data';



// Mock the entire DatabaseService
jest.mock('../shared/database/database.service.js');



/**
 * Cart Initialization
 * Suite in charge of testing that the cart initializes correctly.
 */
describe('Cart Initialization', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can initialize the cart through the getter functions', () => {
    expect(CartService.totalQuantity).toBe(0);
    expect(CartService.prettyTotalQuantity).toEqual('0');
    expect(CartService.totalAmount).toBe(0);
    expect(CartService.items).toEqual([]);
  });
});




/**
 * Cart Actions
 * Suite in charge of testing all the actions that can be performed in the cart.
 */
const clearCart = () => CartService.items.forEach((item) => CartService.delete(item.product.id) );
describe('Cart Actions', () => {
  beforeAll(() => { clearCart() });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { clearCart() });

  test('can add several products', () => {
    const items = [];
    const products = MOCK_PRODUCTS.slice(0, 3);

    expect(CartService.isProductInCart(products[0].id)).toBe(false);

    CartService.add(products[0]);
    expect(CartService.totalQuantity).toBe(1);
    expect(CartService.prettyTotalQuantity).toEqual('1');
    expect(CartService.totalAmount).toBe(products[0].price);
    expect(CartService.isProductInCart(products[0].id)).toBe(true);
    items.push({ quantity: 1, amount: products[0].price, product: products[0]});
    expect(CartService.items).toEqual(items);

    CartService.add(products[1]);
    expect(CartService.totalQuantity).toBe(2);
    expect(CartService.prettyTotalQuantity).toEqual('2');
    expect(CartService.totalAmount).toBe(NumberUtilities.calculateSum(
      [products[0].price, products[1].price]
    ));
    expect(CartService.isProductInCart(products[1].id)).toBe(true);
    items.push({ quantity: 1, amount: products[1].price, product: products[1]});
    expect(CartService.items).toEqual(items);


    CartService.add(products[2]);
    expect(CartService.totalQuantity).toBe(3);
    expect(CartService.prettyTotalQuantity).toEqual('3');
    expect(CartService.totalAmount).toBe(NumberUtilities.calculateSum(
      [products[0].price, products[1].price, products[2].price]
    ));
    expect(CartService.isProductInCart(products[2].id)).toBe(true);
    items.push({ quantity: 1, amount: products[2].price, product: products[2]});
    expect(CartService.items).toEqual(items);
  });

  test('cannot add a product that has already been added', () => {
    const products = MOCK_PRODUCTS.slice(0, 1);
    CartService.add(products[0]);
    expect(() => CartService.add(products[0])).toThrow();
  });

  test('can add several products and increase the quantity of one', () => {
    const products = MOCK_PRODUCTS.slice(0, 3);

    CartService.add(products[0]);
    CartService.add(products[1]);
    CartService.add(products[2]);

    expect(CartService.isProductInCart(products[0].id)).toBe(true);
    expect(CartService.isProductInCart(products[1].id)).toBe(true);
    expect(CartService.isProductInCart(products[2].id)).toBe(true);

    expect(CartService.totalQuantity).toBe(3);
    expect(CartService.prettyTotalQuantity).toEqual('3');
    expect(CartService.totalAmount).toBe(NumberUtilities.calculateSum(products.map((p) => p.price)));

    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[1].id);

    const increasedItem = CartService.items.find((item) => item.product.id === products[1].id);
    const increasedProductAmount = NumberUtilities.buildNumber(
      NumberUtilities.getBigNumber(increasedItem.product.price).times(3)
    );
    expect(increasedItem.quantity).toBe(3);
    expect(increasedItem.amount).toBe(increasedProductAmount);

    expect(CartService.totalQuantity).toBe(5);
    expect(CartService.prettyTotalQuantity).toEqual('5');
    expect(CartService.totalAmount).toBe(NumberUtilities.calculateSum(
      [
        increasedProductAmount, 
        ...products.map((p) => { 
          if (p.id !== products[1].id) { return p.price } else { return 0 }  
        })
      ]
    ));

    expect(CartService.items).toEqual([
      { quantity: 1, amount: products[0].price, product: products[0] },
      { quantity: 3, amount: increasedProductAmount, product: products[1] },
      { quantity: 1, amount: products[2].price, product: products[2] },
    ]);
  });

  test('cannot increase a product that has not yet been added', () => {
    expect(() => CartService.increaseQuantity(MOCK_PRODUCTS[0].id)).toThrow();
  });

  test('can add several products and decrease the quantity of one', () => {
    const products = MOCK_PRODUCTS.slice(0, 3);

    CartService.add(products[0]);
    CartService.add(products[1]);
    CartService.add(products[2]);

    CartService.increaseQuantity(products[2].id);
    CartService.increaseQuantity(products[2].id);
    CartService.increaseQuantity(products[2].id);

    expect(CartService.isProductInCart(products[0].id)).toBe(true);
    expect(CartService.isProductInCart(products[1].id)).toBe(true);
    expect(CartService.isProductInCart(products[2].id)).toBe(true);

    const increasedItem = CartService.items.find((item) => item.product.id === products[2].id);
    expect(increasedItem.quantity).toBe(4);
    expect(increasedItem.amount).toBe(NumberUtilities.buildNumber(
      NumberUtilities.getBigNumber(increasedItem.product.price).times(4)
    ));

    CartService.decreaseQuantity(products[2].id);
    CartService.decreaseQuantity(products[2].id);

    const decreasedItem = CartService.items.find((item) => item.product.id === products[2].id);
    const decreasedItemAmount = NumberUtilities.buildNumber(
      NumberUtilities.getBigNumber(decreasedItem.product.price).times(2)
    );
    expect(decreasedItem.quantity).toBe(2);
    expect(decreasedItem.amount).toBe(decreasedItemAmount);

    expect(CartService.totalQuantity).toBe(4);
    expect(CartService.prettyTotalQuantity).toEqual('4');
    expect(CartService.totalAmount).toBe(NumberUtilities.calculateSum(
      [
        decreasedItemAmount, 
        ...products.map((p) => { 
          if (p.id !== products[2].id) { return p.price } else { return 0 }  
        })
      ]
    ));

    expect(CartService.items).toEqual([
      { quantity: 1, amount: products[0].price, product: products[0] },
      { quantity: 1, amount: products[1].price, product: products[1] },
      { quantity: 2, amount: decreasedItemAmount, product: products[2] },
    ]);
  });

  test('cannot decrease a product that has not yet been added', () => {
    expect(() => CartService.decreaseQuantity(MOCK_PRODUCTS[0].id)).toThrow();
  });

  test('cannot decrease a product if only 1 item has been added', () => {
    const products = MOCK_PRODUCTS.slice(0, 1);
    CartService.add(products[0]);
    expect(() => CartService.decreaseQuantity(products[0].id)).toThrow();
  });

  test('can add and delete an item', () => {
    const products = MOCK_PRODUCTS.slice(0, 1);

    CartService.add(products[0]);
    expect(CartService.totalQuantity).toBe(1);
    expect(CartService.prettyTotalQuantity).toEqual('1');
    expect(CartService.totalAmount).toBe(products[0].price);
    expect(CartService.isProductInCart(products[0].id)).toBe(true);
    expect(CartService.items).toEqual([
      { quantity: 1, amount: products[0].price, product: products[0] },
    ]);

    CartService.delete(products[0].id);
    expect(CartService.totalQuantity).toBe(0);
    expect(CartService.prettyTotalQuantity).toEqual('0');
    expect(CartService.totalAmount).toBe(0);
    expect(CartService.isProductInCart(products[0].id)).toBe(false);
    expect(CartService.items).toEqual([]);
  });

  test('can add several, increase and decrease the quantities and then delete them all', () => {
    const products = MOCK_PRODUCTS.slice(0, 3);

    CartService.add(products[0]);
    CartService.add(products[1]);
    CartService.add(products[2]);

    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[2].id);
    CartService.increaseQuantity(products[2].id);

    CartService.decreaseQuantity(products[0].id);
    CartService.decreaseQuantity(products[1].id);

    CartService.delete(products[0].id);
    CartService.delete(products[1].id);
    CartService.delete(products[2].id);

    expect(CartService.totalQuantity).toBe(0);
    expect(CartService.prettyTotalQuantity).toEqual('0');
    expect(CartService.totalAmount).toBe(0);
    expect(CartService.items).toEqual([]);

    expect(CartService.isProductInCart(products[0].id)).toBe(false);
    expect(CartService.isProductInCart(products[1].id)).toBe(false);
    expect(CartService.isProductInCart(products[2].id)).toBe(false);
  });

  test('cannot delete an item that has not yet been added', () => {
    expect(() => CartService.delete(MOCK_PRODUCTS[0].id)).toThrow();
  });

  test('can display the proper pretty total quantity when there are more than 9 items in the cart', () => {
    const products = MOCK_PRODUCTS.slice(0, 1);
    CartService.add(products[0]);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);

    expect(CartService.prettyTotalQuantity).toEqual('9+');
  });
});
