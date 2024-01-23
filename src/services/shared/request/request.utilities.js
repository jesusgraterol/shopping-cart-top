
/**
 * Request Utilities
 * Provides a series of utilities that simplify the interactions with the Fetch API.
 */
class RequestUtilities {
  /* *****************************
   * FETCH OPTIONS BUILD HELPERS *
   ***************************** */

  /**
   * Builds the fetch request options based on a partial object. The default values were extracted 
   * from: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   * @param {*} partialOptions 
   * @returns object -> IFetchOptions
   */
  static buildFetchOptions(partialOptions) {
    return {
      method: partialOptions?.method ?? 'GET',
      mode: partialOptions?.mode ?? 'cors',
      cache: partialOptions?.cache ?? 'default',
      credentials: partialOptions?.credentials ?? 'same-origin',
      headers: partialOptions?.headers ?? { 'Content-Type': 'application/json' },
      priority: partialOptions?.priority ?? 'auto',
      redirect: partialOptions?.redirect ?? 'follow',
      referrer: partialOptions?.referrer ?? 'about:client',
      referrerPolicy: partialOptions?.referrerPolicy ?? 'no-referrer-when-downgrade',
      signal: partialOptions?.signal,
      integrity: partialOptions?.integrity,
      keepalive: partialOptions?.keepalive ?? false,
      body: RequestUtilities.#buildFetchOptionsBody(partialOptions?.body)
    }
  }

  /**
   * Builds the request's body value based on the provided type.
   * @param {*} body 
   * @returns string
   */
  static #buildFetchOptionsBody(body) {
    if (body && typeof body === 'object') {
      return JSON.stringify(body)
    } else if (typeof body === 'string') {
      return body;
    } else {
      return '';
    }
  }




  /* ******************
   * RESPONSE HELPERS *
   ****************** */

  /**
   * Extracts the data from an HTTP Response object based on the provided data type.
   * @param {*} response 
   * @param {*} responseDataType 
   * @returns Promise<ArrayBuffer|Blob|FormData|object|string>
   */
  static extractResponseData(response, responseDataType) {
    switch (responseDataType) {
      case 'arrayBuffer': {
        return response.arrayBuffer();
      }
      case 'blob': {
        return response.blob();
      }
      case 'formData': {
        return response.formData();
      }
      case 'json': {
        return response.json();
      }
      case 'text': {
        return response.text();
      }
      default:
        throw new Error(`The response data type provided (${responseDataType}) is invalid and therefore the response data cannot be extracted.`);
    }
  }





  /* ************************
   * ERROR HANDLING HELPERS *
   * ************************/

  /**
   * Evaluates if a given request response is valid. If not, it throws an error.
   * @param {*} response 
   * @param {*} expectedResponseCode 
   */
  static validateRequestResponse(response, expectedResponseCode) {
    if (!response || !response.ok || response.status !== expectedResponseCode) {
      throw new Error(RequestUtilities.#buildRequestErrorMessage(response, expectedResponseCode));
    }
  }

  /**
   * Builds the error message that will be thrown when a request fails.
   * @param {*} response 
   * @param {*} expectedCode 
   * @returns string
   */
  static #buildRequestErrorMessage(response, expectedCode) {
    return `Request Failed: received response code ${response.status} when it expected ${expectedCode}. ${response.statusText}`;
  }
}




/**
 * Module Exports
 */
export default RequestUtilities;