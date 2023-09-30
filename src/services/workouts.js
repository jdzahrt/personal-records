import { fetchApi } from '../utils/fetch-api';

export const getWorkouts = async () => {
  try {
    const response = await fetchApi('/api/workouts/get-workouts', 'GET');
    return response.json();
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
