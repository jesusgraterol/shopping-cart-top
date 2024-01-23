import Utilities from '../utilities/utilities.js';
import RequestUtilities from './request.utilities.js';

/**
 * Request Service
 * Service in charge of performing HTTP Requests. This class wraps the Fetch API and was based on:
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * - https://developer.mozilla.org/en-US/docs/Web/API/fetch
 * - https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * - https://developer.mozilla.org/en-US/docs/Web/API/Request
 * - https://developer.mozilla.org/en-US/docs/Web/API/Response
 * - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * - https://web.dev/articles/introduction-to-fetch
 * - https://www.freecodecamp.org/news/how-to-fetch-data-from-an-api-using-the-fetch-api-in-javascript/
 */
class RequestService {
  /**
   * Executes an HTTP GET Request and validates its response.
   * @param {*} url 
   * @param {?} config
   * @returns Promise<{ response: Response, data: any }>
   */
  static get(url, {
    fetchOptions = undefined, 
    expectedResponseCode = 200, 
    responseDataType = 'json', 
    retryAttempts = 0, 
    retryDelaySeconds = 3
  } = {}) {
    return RequestService._send(
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
   * IMPORTANT: This method is supposed to be named #send and be private. Unfortunately, Jest does
   * not support mocking this kind of function and it had to be renamed so testing could be performed
   * properly.
   */
  static async _send(
    url, 
    fetchOptions, 
    expectedResponseCode, 
    responseDataType, 
    retryAttempts, 
    retryDelaySeconds
  ) {
    try {
      return await RequestService._executeSend(
        url,
        fetchOptions,
        expectedResponseCode,
        responseDataType
      );
    } catch (e) {
      // check if the request can be retried. If so, do it after a delay
      if (retryAttempts > 0) {
        await Utilities.delay(retryDelaySeconds);
        return RequestService._send(
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
  static async _executeSend(url, fetchOptions, expectedResponseCode, responseDataType) {
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