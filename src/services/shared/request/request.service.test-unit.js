import RequestService from './request.service.js';
import RequestUtilities from './request.utilities.js';

/**
 * GET Request
 * ..
 */
describe('GET Request', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {  });

  test('can send a request with default arguments', async () => {
    const sendFN = jest.spyOn(RequestService, 'send').mockImplementation();
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

  test('can send a request with default argumentsss', async () => {
    await expect(RequestService.get('somePath')).rejects.toThrow('URL');
  });


});
