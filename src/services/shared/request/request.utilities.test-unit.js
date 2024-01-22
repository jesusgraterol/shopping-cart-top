import RequestUtilities from './request.utilities';

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
