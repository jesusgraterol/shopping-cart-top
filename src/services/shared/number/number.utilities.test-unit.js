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

  test('can calculate the sum for any array of numeric values', () => {
    expect(NumberUtilities.calculateSum(
      [1, 86, '55', 46.33, '47.55', BigNumber(8041.663321), 485, '99.11', BigNumber(-800.654)]
    )).toBe(8061);
  });

  test('throws an error if an invalid numeric array of values is provided', () => {
    expect(() => {
      NumberUtilities.calculateSum(
        [1, 86, '55', 46.33, '47.55', 'abc', 485, '99.11', BigNumber(-800.654)]
      )
    }).toThrow();
    expect(() => NumberUtilities.calculateSum()).toThrow();
    expect(() => NumberUtilities.calculateSum([])).toThrow();
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

  test('can prettify a number with any number of decimals and any rounding mode', () => {
    expect(NumberUtilities.prettifyNumber(1.556, { 
      partialNumberConfig: { decimalPlaces: 2, roundUp: true}
    })).toBe('1.56');
    expect(NumberUtilities.prettifyNumber(105142.821546985, { 
      partialNumberConfig: { decimalPlaces: 8, roundUp: true}
    })).toBe('105,142.82154699');
    expect(NumberUtilities.prettifyNumber(1.556, { 
      partialNumberConfig: { decimalPlaces: 2, roundUp: false}
    })).toBe('1.55');
    expect(NumberUtilities.prettifyNumber(105142.821546985, { 
      partialNumberConfig: { decimalPlaces: 8, roundUp: false}
    })).toBe('105,142.82154698');
  });

  test('can separate groups with any character', () => {
    expect(NumberUtilities.prettifyNumber(15426525.84, {groupSeparator: ' '})).toBe('15 426 525.84');
    expect(NumberUtilities.prettifyNumber(15426525.84, {groupSeparator: '-'})).toBe('15-426-525.84');
  });

  test('can use any character to separate thousands and decimals', () => {
    expect(NumberUtilities.prettifyNumber(15426525.84, {
      groupSeparator: '.', 
      decimalSeparator: ','
    })).toBe('15.426.525,84');
  });

  test('can add a prefix to any number', () => {
    expect(NumberUtilities.prettifyNumber(15426525.84, {prefix: '$'})).toBe('$15,426,525.84');
    expect(NumberUtilities.prettifyNumber(15426525.84, {prefix: 'USD '})).toBe('USD 15,426,525.84');
  });

  test('can add a suffix to any number', () => {
    expect(NumberUtilities.prettifyNumber(15426525.84, {suffix: '$'})).toBe('15,426,525.84$');
    expect(NumberUtilities.prettifyNumber(15426525.84, {suffix: ' USD'})).toBe('15,426,525.84 USD');
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

  test('by default, a number is built to have up to 2 decimals (rounded up) in number type', () => {
    const num = NumberUtilities.buildNumber(1.556);
    expect(typeof num).toBe('number');
    expect(num).toBe(1.56);
  });

  test('can round numbers up and down with any number of decimal places', () => {
    expect(NumberUtilities.buildNumber(1.5, { decimalPlaces: 0, roundUp: true })).toBe(2);
    expect(NumberUtilities.buildNumber(1.5, { decimalPlaces: 0, roundUp: false })).toBe(1);
    expect(NumberUtilities.buildNumber('1.01', { decimalPlaces: 0, roundUp: true })).toBe(2);
    expect(NumberUtilities.buildNumber(BigNumber(1.99), { decimalPlaces: 0, roundUp: false })).toBe(1);
    expect(NumberUtilities.buildNumber('1.66894561', { decimalPlaces: 6, roundUp: true })).toBe(1.668946);
  });

  test('can build a number and output any type', () => {
    expect(typeof NumberUtilities.buildNumber(1)).toBe('number');
    expect(typeof NumberUtilities.buildNumber('1', { buildType: 'number'})).toBe('number');
    expect(typeof NumberUtilities.buildNumber(BigNumber(1), { buildType: 'number'})).toBe('number');
    expect(typeof NumberUtilities.buildNumber(1, { buildType: 'string'})).toBe('string');
    expect(typeof NumberUtilities.buildNumber('1', { buildType: 'string'})).toBe('string');
    expect(typeof NumberUtilities.buildNumber(BigNumber(1), { buildType: 'string'})).toBe('string');
    expect(BigNumber.isBigNumber(NumberUtilities.buildNumber(1, { buildType: 'bignumber'}))).toBe(true);
    expect(BigNumber.isBigNumber(NumberUtilities.buildNumber('1', { buildType: 'bignumber'}))).toBe(true);
    expect(BigNumber.isBigNumber(NumberUtilities.buildNumber(BigNumber(1), { buildType: 'bignumber'}))).toBe(true);
  });

  test('throws an error if an invalid buildType is provided', () => {
    expect(() => NumberUtilities.buildNumber(1, { buildType: 'something'})).toThrow();
    expect(() => NumberUtilities.buildNumber(1, { buildType: 123})).toThrow();
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
