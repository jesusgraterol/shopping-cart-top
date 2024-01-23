import BigNumber from 'bignumber.js';

/**
 * Number Utilities
 * Provides a series of robust functions to handle numbers and operations.
 */
class NumberUtilities {
  /* *************
   * CALCULATORS *
   ************* */

  /**
   * Calculates the SUM for a given list of numeric values. The types of the values can be mixed.
   * For example: [2, new BigNumber(14), '15.9999', 12]
   * @param {*} values 
   * @param {*} partialNumberConfig 
   * @returns string|number|BigNumber
   */
  static calculateSum(values, partialNumberConfig = undefined) {
    return NumberUtilities.buildNumber(BigNumber.sum.apply(null, values), partialNumberConfig);
  }
  


  /* **************
   * MISC HELPERS *
   ************** */

  /**
   * Prettifies a given number and readies it to be displayed in the GUI. Note that this function
   * will always return a string, regardless of the given numberConfig.
   * @param {*} value 
   * @param {*} param1 
   * @returns string
   */
  static prettifyNumber(value, {
    partialNumberConfig = undefined, // the number configuration that will be used to process it
    prefix = '', // string to prepend
    decimalSeparator = '.', // decimal separator
    groupSeparator = ',', // grouping separator of the integer part
    groupSize = 3, // primary grouping size of the integer part
    secondaryGroupSize = 0, // secondary grouping size of the integer part
    fractionGroupSeparator = ' ', // grouping separator of the fraction part
    fractionGroupSize = 0, // grouping size of the fraction part
    suffix = '' // string to append
  } = {}) {
    // build the config
    const { decimalPlaces, roundingMode } = NumberUtilities.#buildNumberConfig(partialNumberConfig);
    return NumberUtilities.getBigNumber(value).toFormat(decimalPlaces, roundingMode, {
      prefix,
      decimalSeparator,
      groupSeparator,
      groupSize,
      secondaryGroupSize,
      fractionGroupSeparator,
      fractionGroupSize,
      suffix
    });
  }



  /**
   * Builds a number based on the provided configuration.
   * @param {*} value 
   * @param {*} partialNumberConfig 
   * @returns string|number|BigNumber
   */
  static buildNumber(value, partialNumberConfig = undefined) {
    // build the config
    const config = NumberUtilities.#buildNumberConfig(partialNumberConfig);

    // init the BigNumber instance and set the decimal places
    const bn = NumberUtilities.getBigNumber(value).decimalPlaces(
      config.decimalPlaces, 
      config.roundingMode
    );

    // finally, return the number based on the desired build type
    switch(config.buildType) {
      case 'string':
        return bn.toString();
      case 'number':
        return bn.toNumber();
      case 'bignumber':
        return bn;
      default:
        throw new Error(`Unable to output the number because the buildType is invalid. Received: ${config.buildType}`);
    }
  }





  /**
   * Builds the number configuration based on a partial configuration object.
   * @param {?} partialConfig 
   * @returns INumberConfig
   */
  static #buildNumberConfig({ decimalPlaces = 2, roundUp = true, buildType = 'number' } = {}) {
    return {
      decimalPlaces: decimalPlaces,
      roundingMode: roundUp ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN,
      buildType: buildType
    }
  }





  /**
   * Retrieves a BigNumber instance for a given value (string|number|BigNumber).
   * @param {*} value 
   * @returns BigNumber
   */
  static getBigNumber(value) {
    // init the BigNumber instance
    const bn = BigNumber.isBigNumber(value) ? value : BigNumber(value);

    // ensure it is a valid number
    if (bn.isNaN()) {
      throw new Error(`BigNumber cannot be instantiated because the provided value is invalid. Received: ${value}`);
    }

    // return the instance
    return bn;
  }
}




/**
 * Module Exports
 */
export default NumberUtilities;