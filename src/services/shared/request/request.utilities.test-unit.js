import RequestUtilities from './request.utilities';

/**
 * Fetch Options Build
 * Suite in charge of testing the the Fetch Request Options Build with default and custom values.
 */
describe('Fetch Options Build', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build the default fetch options', () => {
    const defaultOptions = {
      method: 'GET',
      mode: 'cors',
      cache: 'default',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      priority: 'auto',
      redirect: 'follow',
      referrer: 'about:client',
      referrerPolicy: 'no-referrer-when-downgrade',
      signal: undefined,
      integrity: undefined,
      keepalive: false,
      body: ''
    };
    expect(defaultOptions).toEqual(RequestUtilities.buildFetchOptions());
    expect(defaultOptions).toEqual(RequestUtilities.buildFetchOptions({ method: 'GET'}));
  });

  test('can build custom fetch options', () => {
    expect({
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      priority: 'high',
      redirect: 'manual',
      referrer: '',
      referrerPolicy: 'unsafe-url',
      signal: undefined,
      integrity: 'sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=',
      keepalive: true,
      body: ''
    }).toEqual(RequestUtilities.buildFetchOptions({
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      priority: 'high',
      redirect: 'manual',
      referrer: '',
      referrerPolicy: 'unsafe-url',
      signal: undefined,
      integrity: 'sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=',
      keepalive: true,
      body: ''
    }));
  });

  test('can build fetch options with body', () => {
    const fetchBody = { foo: 'bar', baz: 123, hello: true };
    const options = RequestUtilities.buildFetchOptions({
      method: 'POST',
      body: fetchBody
    });
    expect(JSON.stringify(fetchBody)).toEqual(options.body);
  });
});





/**
 * Fetch Response Data Extraction
 * Suite in charge of building the promise that extracts the fetch response data.
 */
function setupResponseDataObj() {
  return {
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    json: jest.fn(),
    text: jest.fn(),
  };
}
describe('Fetch Response Data Extraction', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can extract an arrayBuffer from the response', () => {
    const res = setupResponseDataObj();
    RequestUtilities.extractResponseData(res, 'arrayBuffer');
    expect(res.arrayBuffer).toHaveBeenCalled();
    expect(res.blob).not.toHaveBeenCalled();
    expect(res.formData).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.text).not.toHaveBeenCalled();
  });

  test('can extract a blob from the response', () => {
    const res = setupResponseDataObj();
    RequestUtilities.extractResponseData(res, 'blob');
    expect(res.arrayBuffer).not.toHaveBeenCalled();
    expect(res.blob).toHaveBeenCalled();
    expect(res.formData).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.text).not.toHaveBeenCalled();
  });

  test('can extract a formData from the response', () => {
    const res = setupResponseDataObj();
    RequestUtilities.extractResponseData(res, 'formData');
    expect(res.arrayBuffer).not.toHaveBeenCalled();
    expect(res.blob).not.toHaveBeenCalled();
    expect(res.formData).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.text).not.toHaveBeenCalled();
  });

  test('can extract a json from the response', () => {
    const res = setupResponseDataObj();
    RequestUtilities.extractResponseData(res, 'json');
    expect(res.arrayBuffer).not.toHaveBeenCalled();
    expect(res.blob).not.toHaveBeenCalled();
    expect(res.formData).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.text).not.toHaveBeenCalled();
  });

  test('can extract a text from the response', () => {
    const res = setupResponseDataObj();
    RequestUtilities.extractResponseData(res, 'text');
    expect(res.arrayBuffer).not.toHaveBeenCalled();
    expect(res.blob).not.toHaveBeenCalled();
    expect(res.formData).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.text).toHaveBeenCalled();
  });

  test('throws an error if an invalid data type is provided', () => {
    const res = setupResponseDataObj();
    expect(() => { RequestUtilities.extractResponseData(res) }).toThrow();
  });
});