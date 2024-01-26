
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



  /**
   * Given an error, it will attempt to extract the error message regardless of the type.
   * @param {*} e 
   * @returns string
   */
  static extractErrorMessage(e) {
    // unknown error default message
    const unknownError = 'The error message could not be extracted, find more information in the server logs.';

    // handle a string
    if (typeof e == "string") {
        return e;
    }

    // handle an object
    else if (e && typeof e === "object") {
      // check the deeper message keys
      if (typeof e.message == "string" && e.message.length) {
          return e.message;
      } else if (typeof e.msg == "string" && e.msg.length) {
        return e.msg;
      }

      // otherwise, stringify the entire object
      return JSON.stringify(e);
    }

    // unknown error
    else {
        return unknownError;
    }
  }
}




/**
 * Module Exports
 */
export default Utilities;