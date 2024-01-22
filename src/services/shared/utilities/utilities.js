
/**
 * Utilities
 * Provides commonly used functionality in order to main consistency across modules.
 */
class Utilities {
  /**
   * Creates a delay that resolves after provided seconds have passed.
   * @param {*} seconds 
   * @returns Promise<void>
   */
  static delay(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}




/**
 * Module Exports
 */
export default Utilities;