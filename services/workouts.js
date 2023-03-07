import { fetchApi } from '../utils/fetch-api';
import { calcDaysQuit } from '../utils/days';

export const getWorkouts = async () => {
  try {
    const response = await fetchApi('/api/workouts/get-workouts', 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch workout history. ${e}`);
  }
};

export const getWorkoutsTest = async () => {
  try {
    const response = await fetchApi('/api/workouts/get-workouts', 'GET');
    const data = await response.json();
    const holdData = [];

    data.forEach((e) => {
      holdData.push({
        workoutId: e.workoutId,
        days: 0,
        date: '',
        exerciseCount: e.exercises.length,
      });

      e.exercises.forEach((f) => {
        const ix = holdData.findIndex((x) => x.workoutId === e.workoutId);

        if (new Date(f.date) > holdData[ix].date) {
          holdData[ix].days = calcDaysQuit(f.date);
          holdData[ix].date = f.date;
        }
      });
    });

    const cResult = [];
    data.forEach((d) => {
      const workoutSummary = holdData.find((x) => x.workoutId === d.workoutId);
      const combinedResults = { ...d, ...workoutSummary };

      cResult.push(combinedResults);
    });

    return cResult;
  } catch (e) {
    throw new Error(`Could not fetch workout history. ${e}`);
  }
};

export const getWorkout = async (workoutId) => {
  try {
    const response = await fetchApi(`/api/workouts/get-workout?workoutId=${workoutId}`, 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch workout. ${e}`);
  }
};

export const addWorkout = async (payload) => {
  try {
    await fetchApi('/api/workouts/add', 'POST', payload);
  } catch (e) {
    throw new Error(`Could not add workout record. ${e}`);
  }
};

export const updateWorkout = async (payload) => {
  try {
    await fetchApi(`/api/workouts/update?id=${payload.workoutId}`, 'PUT', payload);
  } catch (e) {
    throw new Error(`Could not update workout record. ${e}`);
  }
};

export const deleteWorkout = async (id) => {
  try {
    await fetchApi(`/api/workouts/delete?id=${id}`, 'DELETE');
  } catch (e) {
    throw new Error(`Could not delete workout record. ${e}`);
  }
};
