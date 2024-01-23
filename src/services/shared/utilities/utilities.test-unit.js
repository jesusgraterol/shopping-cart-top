import Utilities from "./utilities.js";

/**
 * String Manipulation Helpers
 * Suite in charge of testing all string manipulation helpers.
 */
describe('String Manipulation Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can capitalize the first letter of every word in a sentence', async() => {
    expect(Utilities.capitalizeWords('I\'m a little tea pot')).toBe('I\'m A Little Tea Pot');
    expect(Utilities.capitalizeWords('electronics')).toBe('Electronics');
    expect(Utilities.capitalizeWords('jewelery')).toBe('Jewelery');
    expect(Utilities.capitalizeWords('men\'s clothing')).toBe('Men\'s Clothing');
    expect(Utilities.capitalizeWords('women\'s clothing')).toBe('Women\'s Clothing');
    expect(Utilities.capitalizeWords('WOMEN\'s CLOTHING')).toBe('Women\'s Clothing');
  });
});
