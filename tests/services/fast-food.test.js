import {
  addFastFood,
  deleteFastFood,
  getFastFoodHistory,
  updateFastFood,
} from '../../src/services/fast-food';
import { fetchApi } from '../../src/utils/fetch-api';

jest.mock('../../utils/fetch-api');
jest.mock('../../models/history');

describe('workout-service', () => {
  test('getFastFoodHistory', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      json: () => ({ id: 1 }),
    }));

    await getFastFoodHistory();

    expect(fetchApi).toHaveBeenCalledWith('/api/fast-food-tracker/get-history', 'GET');
  });

  test('getFastFoodHistory failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await getFastFoodHistory();
    } catch (e) {
      expect(e.message).toEqual(`Could not fetch fast-food history. ${error}`);
    }
  });

  test('addFastFood', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const payload = {
      quitDate: '1/1/2022',
    };

    await addFastFood(payload);
    expect(fetchApi).toHaveBeenCalledWith('/api/fast-food-tracker/add', 'POST', payload);
  });

  test('addFastFood failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    const payload = {
      quitDate: '1/1/2022',
    };

    try {
      await addFastFood(payload);
    } catch (e) {
      expect(e.message).toEqual(`Could not add fast-food record. ${error}`);
    }
  });

  test('updateFastFood', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const id = 1;
    const payload = {
      active: true,
      endDate: '1/1/2022',
    };

    await updateFastFood(id, payload);
    expect(fetchApi).toHaveBeenCalledWith(`/api/fast-food-tracker/update?id=${id}`, 'PUT', payload);
  });

  test('updateFastFood failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await updateFastFood();
    } catch (e) {
      expect(e.message).toEqual(`Could not update fast-food record. ${error}`);
    }
  });

  test('deleteFastFood', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {},
    }));

    const id = 1;

    await deleteFastFood(id);
    expect(fetchApi).toHaveBeenCalledWith(`/api/fast-food-tracker/delete?id=${id}`, 'DELETE');
  });

  test('deleteFastFood failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await deleteFastFood();
    } catch (e) {
      expect(e.message).toEqual(`Could not delete fast-food record. ${error}`);
    }
  });
});
