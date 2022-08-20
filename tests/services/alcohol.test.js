import {
  addAlcohol,
  deleteAlcohol,
  getAlcoholHistory,
  updateAlcohol,
} from '../../services/alcohol';
import { fetchApi } from '../../utils/fetch-api';

jest.mock('../../utils/fetch-api');

describe('alcohol-service', () => {
  test('getAlcoholHistory', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      json: () => ({ id: 1 }),
    }));

    await getAlcoholHistory();

    expect(fetchApi).toHaveBeenCalledWith('/api/alcohol-tracker/get-history', 'GET');
  });

  test('getAlcoholHistory failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await getAlcoholHistory();
    } catch (e) {
      expect(e.message).toEqual(`Could not fetch alcohol history. ${error}`);
    }
  });

  test('addAlcohol', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const payload = {
      quitDate: '1/1/2022',
    };

    await addAlcohol(payload);
    expect(fetchApi).toHaveBeenCalledWith('/api/alcohol-tracker/add', 'POST', payload);
  });

  test('addAlcohol failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    const payload = {
      quitDate: '1/1/2022',
    };

    try {
      await addAlcohol(payload);
    } catch (e) {
      expect(e.message).toEqual(`Could not add alcohol record. ${error}`);
    }
  });

  test('updateAlcohol', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const id = 1;
    const payload = {
      active: true,
      endDate: '1/1/2022',
    };

    await updateAlcohol(id, payload);
    expect(fetchApi).toHaveBeenCalledWith(`/api/alcohol-tracker/update?id=${id}`, 'PUT', payload);
  });

  test('updateAlcohol failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await updateAlcohol();
    } catch (e) {
      expect(e.message).toEqual(`Could not update alcohol record. ${error}`);
    }
  });

  test('deleteAlcohol', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const id = 1;

    await deleteAlcohol(id);
    expect(fetchApi).toHaveBeenCalledWith(`/api/alcohol-tracker/delete?id=${id}`, 'DELETE');
  });

  test('deleteAlcohol failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await deleteAlcohol();
    } catch (e) {
      expect(e.message).toEqual(`Could not delete alcohol record. ${error}`);
    }
  });
});
