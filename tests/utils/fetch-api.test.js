import { fetchApi } from '../../src/utils/fetch-api';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(),
}));

describe('fetch-api', () => {
  test('fetchApi', async () => {
    const url = 'localhost:8000/api-test';
    const method = 'POST';
    const body = {
      id: 1,
      text: 'hello',
    };

    const expectedInit = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    await fetchApi(url, method, body);

    expect(fetch).toHaveBeenCalledWith(url, expectedInit);
  });
});
