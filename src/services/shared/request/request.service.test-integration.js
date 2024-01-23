import RequestService from './request.service.js';

/**
 * HTTP GET Requests
 * Suite in charge of testing HTTP GET Requests.
 */
describe('HTTP GET Requests', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {  });

  test('can send a valid HTTP GET request and extract the response data', async () => {
    const url = 'https://httpbin.org/anything';
    const { response, data } = await RequestService.get(url);
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.ok).toBe(true);
    expect(response.status).toBe(200);
    expect(data).toBeTruthy();
    expect(typeof data).toBe('object');
    expect(data.method).toBe('GET');
    expect(data.url).toBe(url);
  }, 10000);

  test('can send an HTTP GET request with params', async () => {
    const url = 'https://httpbin.org/anything';
    const paramsObj = { foo: 'boot', baz: 'bin', jeez: 123, mate: true };
    const params = new URLSearchParams(paramsObj);
    const { data } = await RequestService.get(`${url}?${params.toString()}`);
    expect(typeof data.args).toBe('object');
    expect(data.args.foo == paramsObj.foo).toBe(true);
    expect(data.args.baz == paramsObj.baz).toBe(true);
    expect(data.args.jeez == paramsObj.jeez).toBe(true);
    expect(data.args.mate == String(paramsObj.mate)).toBe(true);
  }, 10000);
});