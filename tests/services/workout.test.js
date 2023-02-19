import {
  addWorkout,
  deleteWorkout,
  getWorkoutDetail,
  getWorkoutHistory,
  updateWorkout,
} from '../../services/workout';
import { fetchApi } from '../../utils/fetch-api';

jest.mock('../../utils/fetch-api');

describe('workout-service', () => {
  test('getWorkoutDetail', async () => {
    const expectedId = 1;
    fetchApi.mockReturnValue(Promise.resolve({
      json: () => ({ id: expectedId }),
    }));

    await getWorkoutDetail(expectedId);

    expect(fetchApi)
      .toHaveBeenCalledWith(`/api/workout-detail/get-workout-detail?id=${expectedId}`, 'GET');
  });

  test('getWorkoutDetail failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await getWorkoutDetail();
    } catch (e) {
      expect(e.message)
        .toEqual(`Could not fetch workout detail. ${error}`);
    }
  });

  test('getWorkoutHistory', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      json: () => ({ id: 1 }),
    }));

    await getWorkoutHistory();

    expect(fetchApi)
      .toHaveBeenCalledWith('/api/workout-tracker/get-history', 'GET');
  });

  test('getWorkoutHistory failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await getWorkoutHistory();
    } catch (e) {
      expect(e.message)
        .toEqual(`Could not fetch workout history. ${error}`);
    }
  });

  test('addWorkout', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {
      },
    }));

    const payload = {
      quitDate: '1/1/2022',
    };

    await addWorkout(payload);
    expect(fetchApi)
      .toHaveBeenCalledWith('/api/workout-tracker/add', 'POST', payload);
  });

  test('addWorkout failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    const payload = {
      quitDate: '1/1/2022',
    };

    try {
      await addWorkout(payload);
    } catch (e) {
      expect(e.message)
        .toEqual(`Could not add workout record. ${error}`);
    }
  });

  test('updateWorkout', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {
      },
    }));

    const payload = {
      workoutId: 1,
      active: true,
      endDate: '1/1/2022',
    };

    await updateWorkout(payload);
    expect(fetchApi)
      .toHaveBeenCalledWith(`/api/workout-tracker/update?id=${payload.workoutId}`, 'PUT', payload);
  });

  test('updateWorkout failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    const payload = {
      _id: 1,
      active: true,
      endDate: '1/1/2022',
    };

    try {
      await updateWorkout(payload);
    } catch (e) {
      expect(e.message)
        .toEqual(`Could not update workout record. ${error}`);
    }
  });

  test('deleteWorkout', async () => {
    fetchApi.mockReturnValue(Promise.resolve({
      status: 201,
      json: () => {
      },
    }));

    const id = 1;

    await deleteWorkout(id);
    expect(fetchApi)
      .toHaveBeenCalledWith(`/api/workout-tracker/delete?id=${id}`, 'DELETE');
  });

  test('deleteWorkout failure', async () => {
    const error = 'Big error';
    fetchApi.mockImplementationOnce(() => Promise.reject(error));

    try {
      await deleteWorkout();
    } catch (e) {
      expect(e.message)
        .toEqual(`Could not delete workout record. ${error}`);
    }
  });
});
