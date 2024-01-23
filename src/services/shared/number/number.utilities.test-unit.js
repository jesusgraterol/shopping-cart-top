import BigNumber from 'bignumber.js';
import NumberUtilities from './number.utilities.js';

/* *************
 * CALCULATORS *
 ************* */

/**
 * SUM Calculator
 * Suite in charge of calculating the sum for numeric arrays.
 */
describe('SUM Calculator', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test.skip('...', () => {
    expect(2).toBe(2);
  });
});




/* **************
 * MISC HELPERS *
 ************** */

/**
 * Number Prettifier
 * Suite in charge of prettifying numbers so they can be displayed to users through the GUI.
 */
describe('Number Prettifier', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test.skip('...', () => {
    expect(2).toBe(2);
  });
});





/**
 * Number Build
 * Suite in charge of building numbers capable of handling any configuration.
 */
describe('Number Build', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test.skip('...', () => {
    expect(2).toBe(2);
  });
});





/**
 * BigNumber Instance
 * Suite in charge of initializing BigNumber instances with a series of data types.
 */
describe('BigNumber Instance', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can instantiate BigNumber with a string', () => {
    const bn = NumberUtilities.getBigNumber('100.55');
    expect(BigNumber.isBigNumber(bn)).toBe(true);
    expect(bn.isEqualTo('100.55')).toBe(true);
  });

  test('can instantiate BigNumber with a number', () => {
    const bn = NumberUtilities.getBigNumber(100.55);
    expect(BigNumber.isBigNumber(bn)).toBe(true);
    expect(bn.isEqualTo(100.55)).toBe(true);
  });

  test('can instantiate BigNumber with another BigNumber instance', () => {
    const bn = NumberUtilities.getBigNumber(BigNumber(100.55));
    expect(BigNumber.isBigNumber(bn)).toBe(true);
    expect(bn.isEqualTo(BigNumber(100.55))).toBe(true);
  });

  test('regardless of how the BigNumber is instantiated, it is always equivalent', () => {
    const fromString = NumberUtilities.getBigNumber('456452154.5645412');
    const fromNumber = NumberUtilities.getBigNumber(456452154.5645412);
    const fromBigNumber = NumberUtilities.getBigNumber(BigNumber(456452154.5645412));

    // ensure they are all instances of BigNumber
    expect(BigNumber.isBigNumber(fromString)).toBe(true);
    expect(BigNumber.isBigNumber(fromNumber)).toBe(true);
    expect(BigNumber.isBigNumber(fromBigNumber)).toBe(true);

    // they should be all equals to one another
    expect(fromString.isEqualTo(fromNumber)).toBe(true);
    expect(fromNumber.isEqualTo(fromBigNumber)).toBe(true);
    expect(fromString.isEqualTo(fromBigNumber)).toBe(true);
  });

  test('throws an error if an invalid number is provided', () => {
    expect(() => NumberUtilities.getBigNumber({})).toThrow();
    expect(() => NumberUtilities.getBigNumber('asdas!@')).toThrow();
    expect(() => NumberUtilities.getBigNumber(true)).toThrow();
    expect(() => NumberUtilities.getBigNumber(false)).toThrow();
    expect(() => NumberUtilities.getBigNumber([])).toThrow();
    expect(() => NumberUtilities.getBigNumber([1, 2, 3])).toThrow();
    expect(() => NumberUtilities.getBigNumber('asd123')).toThrow();
  });
});
