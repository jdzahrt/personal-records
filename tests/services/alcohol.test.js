import * as fetch from '../../utils/fetch-api';
import { getAlcoholHistory } from '../../services/alcohol';
// import { getAlcoholHistory } from '../../services/alcohol';

jest.mock('../../utils/fetch-api', () => ({
  fetch: jest.fn(),
}));

// test('test', () => {
//   // eslint-disable-next-line no-import-assign
//
//   // jest.mock(fetchApi);
//   gets.getAlcoholHistory();
//   expect(1).toEqual(1);
// });

describe('TEST', () => {
  it('calls stuff', async () => {
    await getAlcoholHistory();
    expect(fetch.fetchApi).toHaveBeenCalled();
  });
});
