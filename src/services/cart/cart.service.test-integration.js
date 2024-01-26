/**
 * @jest-environment jsdom
 */
import Database from '../shared/database/database.service.js';
import CartService from './cart.service.js';
import { MOCK_PRODUCTS } from './test-data';



// Database Key where the record is stored
const DB_KEY = 'cartRecord';



/**
 * Cart Interactions
 */
describe('Cart Interactions', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can perform a series of actions and match the data stored in the db', () => {
    // the db should be empty
    let dbRecord = Database.read(DB_KEY);
    expect(dbRecord).toBe(undefined);

    // perform some actions
    const products = MOCK_PRODUCTS.slice(0, 4);

    expect(CartService.isProductInCart(products[0].id)).toBe(false);
    expect(CartService.isProductInCart(products[1].id)).toBe(false);
    expect(CartService.isProductInCart(products[2].id)).toBe(false);
    expect(CartService.isProductInCart(products[3].id)).toBe(false);

    CartService.add(products[0]);
    CartService.add(products[1]);
    CartService.add(products[2]);
    CartService.add(products[3]);

    expect(CartService.isProductInCart(products[0].id)).toBe(true);
    expect(CartService.isProductInCart(products[1].id)).toBe(true);
    expect(CartService.isProductInCart(products[2].id)).toBe(true);
    expect(CartService.isProductInCart(products[3].id)).toBe(true);

    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[0].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[1].id);
    CartService.increaseQuantity(products[2].id);
    CartService.increaseQuantity(products[2].id);
    CartService.increaseQuantity(products[3].id);

    CartService.decreaseQuantity(products[0].id);
    CartService.decreaseQuantity(products[1].id);

    CartService.delete(products[3].id);

    expect(CartService.isProductInCart(products[3].id)).toBe(false);

    // retrieve the db record and ensure the data is valid
    dbRecord = Database.read(DB_KEY);
    const items = CartService.items;
    expect(dbRecord).toEqual({
      totalQuantity: CartService.totalQuantity,
      totalAmount: CartService.totalAmount,
      items: {
        [items[0].product.id]: items[0],
        [items[1].product.id]: items[1],
        [items[2].product.id]: items[2],
      }
    });
  });
});
