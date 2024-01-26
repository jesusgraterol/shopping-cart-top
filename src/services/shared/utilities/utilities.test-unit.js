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

  test('can capitalize the first letter of every word in a sentence', () => {
    expect(Utilities.capitalizeWords('I\'m a little tea pot')).toBe('I\'m A Little Tea Pot');
    expect(Utilities.capitalizeWords('electronics')).toBe('Electronics');
    expect(Utilities.capitalizeWords('jewelery')).toBe('Jewelery');
    expect(Utilities.capitalizeWords('men\'s clothing')).toBe('Men\'s Clothing');
    expect(Utilities.capitalizeWords('women\'s clothing')).toBe('Women\'s Clothing');
    expect(Utilities.capitalizeWords('WOMEN\'s CLOTHING')).toBe('Women\'s Clothing');
  });

  test('can truncate a given text', () => {
    expect(Utilities.truncateText('Im a little tea pot', 10)).toBe('Im a littl...');
    expect(Utilities.truncateText('Im a little tea pot', 5, '---')).toBe('Im a ---');
    expect(Utilities.truncateText('Im a little tea pot', 20)).toBe('Im a little tea pot');
  });
});




/**
 * Error Handling Helpers
 * Suite in charge of testing all error handling helpers.
 */
describe('Error Handling Helpers', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('returns a default message if the error cannot be extracted', () => {
    expect(Utilities.extractErrorMessage()).toEqual('The error message could not be extracted, find more information in the server logs.');
  });

  test('can retrieve an error message from a string', () => {
    const test = 'Hey, this is a nasty error!!!!';
    expect(Utilities.extractErrorMessage(test)).toEqual(test);
  });

  test('can retrieve an error instance.', () => {
      const test = 'Hey, this is a nasty error!!!!';
      try {
          throw new Error(test)
      } catch (e) {
          expect(Utilities.extractErrorMessage(e)).toEqual(test);
      }
  });

  test('can retrieve an error message from an unknown object.', () => {
      const test = {foo: 'bar', mez: 'can', liz: 1};
      const obj = Utilities.extractErrorMessage(test);
      const newObj = JSON.parse(obj);
      expect(newObj.foo).toEqual(test.foo);
      expect(newObj.mez).toEqual(test.mez);
      expect(newObj.liz).toEqual(test.liz);
  });
});