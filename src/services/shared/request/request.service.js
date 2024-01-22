import Utilities from '../utilities/utilities.js';
import RequestUtilities from './request.utilities.js';

/**
 * Request Service
 * Service in charge of performing HTTP Requests.
 */
class RequestService {
  /**
   * Executes an HTTP GET Request and validates its response.
   * @param {*} url 
   * @param {?} fetchOptions 
   * @param {?} expectedResponseCode 
   * @param {?} responseDataType 
   * @param {?} retryAttempts 
   * @param {?} retryDelaySeconds 
   * @returns Promise<{ response: Response, data: any }>
   */
  static get(
    url, 
    fetchOptions = undefined, 
    expectedResponseCode = 200, 
    responseDataType = 'json', 
    retryAttempts = 0, 
    retryDelaySeconds = 3
  ) {
    return RequestService.#sendRequest(
      url, 
      RequestUtilities.buildFetchOptions({ ...fetchOptions, method: 'GET' }),
      expectedResponseCode,
      responseDataType,
      retryAttempts,
      retryDelaySeconds
    );
  }

  

  /* *******************
   * REQUEST PROCESSOR *
   ******************* */

  /**
   * Sends an HTTP Request based on the provided arguments in a persistant manner.
   * @param {*} url 
   * @param {*} fetchOptions 
   * @param {*} expectedResponseCode 
   * @param {*} responseDataType 
   * @param {*} retryAttempts 
   * @param {*} retryDelaySeconds 
   * @returns Promise<{ response: Response, data: any }>
   */
  static async #sendRequest(
    url, 
    fetchOptions, 
    expectedResponseCode, 
    responseDataType, 
    retryAttempts, 
    retryDelaySeconds
  ) {
    try {
      return await RequestService.#_sendRequest(
        url,
        fetchOptions,
        expectedResponseCode,
        responseDataType
      );
    } catch (e) {
      // check if the request can be retried. If so, do it after a delay
      if (retryAttempts > 0) {
        await Utilities.delay(retryDelaySeconds);
        return RequestService.#sendRequest(
          url, 
          fetchOptions,
          expectedResponseCode,
          responseDataType,
          retryAttempts - 1,
          retryDelaySeconds
        );
      }

      // otherwise, rethrow the error
      throw e;
    }
  }
  static async #_sendRequest(url, fetchOptions, expectedResponseCode, responseDataType) {
    // execute the request
    const response = await fetch(url, fetchOptions);

    // validate the response
    RequestUtilities.validateRequestResponse(response, expectedResponseCode);

    // return the response and the retrieved data (if any)
    return { 
      response: response, // response: response.clone(), unnecessary
      data: await RequestUtilities.extractResponseData(response, responseDataType)
    };
  }
}




/**
 * Module Exports
 */
export default RequestService;