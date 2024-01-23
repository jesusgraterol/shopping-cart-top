
/**
 * Utilities
 * Provides commonly used functionality in order to main consistency across modules.
 */
class Utilities {

  /* *****************************
   * STRING MANIPULATION HELPERS *
   ***************************** */

  /**
   * Capitalizes the first letter of every word within a sentence. For example:
   * I'm a little tea pot > I'm A Little Tea Pot
   * @param {*} sentence 
   * @returns string
   */
  static capitalizeWords(sentence) {
    return sentence.toLowerCase().split(' ').map(
      word => word.charAt(0).toUpperCase() + word.substring(1)
    ).join(' ');
  }




  
  /* **************
   * MISC HELPERS *
   ************** */

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