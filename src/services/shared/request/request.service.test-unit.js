import RequestService from './request.service.js';
import RequestUtilities from './request.utilities.js';

/**
 * HTTP Request
 * Suite in charge of testing the basics of sending HTTP Requests.
 */
describe('HTTP Request', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {  });

  test('can send a request', async () => {
    const executeSendFN = jest.spyOn(RequestService, '_executeSend').mockImplementation();
    await RequestService._send(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      200,
      'json',
      0,
      3
    );
    expect(executeSendFN).toHaveBeenCalledWith(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      200,
      'json',
    );
    executeSendFN.mockRestore();
  });

  test('can send a request and fail gracefully', async () => {
    const executeSendFN = jest.spyOn(RequestService, '_executeSend').mockImplementation(() => {
      throw new Error('BAD Request');
    });
    await expect(RequestService._send(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      200,
      'json',
      0,
      3
    )).rejects.toThrow('BAD Request'); 
    expect(executeSendFN).toHaveBeenCalledTimes(1);
    executeSendFN.mockRestore();
  });

  test('can send a request and retry it 3 times in case of failure', async () => {
    const executeSendFN = jest.spyOn(RequestService, '_executeSend').mockImplementation(() => {
      throw new Error('BAD Request');
    });
    await expect(RequestService._send(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      200,
      'json',
      3,
      0
    )).rejects.toThrow('BAD Request'); 
    expect(executeSendFN).toHaveBeenCalledTimes(1 + 3); // original request + 3 retry attempts
    executeSendFN.mockRestore();
  });
});





/**
 * HTTP Request Methods
 * Suite in charge of testing the initialization of a request with any configuration.
 */
describe('HTTP Request Methods', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {  });

  test('can send a GET request with default arguments', async () => {
    const sendFN = jest.spyOn(RequestService, '_send').mockImplementation();
    await RequestService.get('somePath');
    expect(sendFN).toHaveBeenCalledWith(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      200,
      'json',
      0,
      3
    );
    sendFN.mockRestore();
  });

  test('can send a GET request with any arguments', async () => {
    const sendFN = jest.spyOn(RequestService, '_send').mockImplementation();
    await RequestService.get('somePath', {
      expectedResponseCode: 201,
      responseDataType: 'text',
      retryAttempts: 3,
      retryDelaySeconds: 5
    });
    expect(sendFN).toHaveBeenCalledWith(
      'somePath',
      RequestUtilities.buildFetchOptions({ method: 'GET' }),
      201,
      'text',
      3,
      5
    );
    sendFN.mockRestore();
  });
});
