import { fetchApi } from '../utils/fetch-api';

export const getExercise = async (workoutExerciseId) => {
  try {
    const response = await fetchApi(`/api/exercise/get-workout-exercise?workoutExerciseId=${workoutExerciseId}`, 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch exercise info. ${e}`);
  }
};

export const getExercises = async () => {
  try {
    const response = await fetchApi('/api/exercise/get-exercises', 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch exercises. ${e}`);
  }
};

export const getWorkoutExercises = async (workoutId) => {
  try {
    if (workoutId) {
      const response = await fetchApi(`/api/exercise/get-workout-exercises?workoutId=${workoutId}`, 'GET');
      return response.json();
    }
    const response = await fetchApi('/api/exercise/get-exercises', 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch exercise info. ${e}`);
  }
};

export const addWorkoutExercise = async (payload) => {
  try {
    await fetchApi('/api/exercise/add-workout-exercise', 'POST', payload);
  } catch (e) {
    throw new Error(`Could not add workout exercise record. ${e}`);
  }
};

export const deleteWorkoutExercise = async (id) => {
  try {
    await fetchApi(`/api/exercise/delete-workout-exercise?id=${id}`, 'DELETE');
  } catch (e) {
    throw new Error(`Could not delete exercise record. ${e}`);
  }
};

export const addExercise = async (payload) => {
  try {
    await fetchApi('/api/exercise/add', 'POST', payload);
  } catch (e) {
    throw new Error(`Could not add exercise record. ${e}`);
  }
};

export const updateExercise = async (payload) => {
  try {
    await fetchApi(`/api/exercise/update-workout-exercise?id=${payload.workoutExerciseId}`, 'PUT', payload);
  } catch (e) {
    throw new Error(`Could not update exercise record. ${e}`);
  }
};

export const deleteExercise = async (id) => {
  try {
    await fetchApi(`/api/exercise/delete?id=${id}`, 'DELETE');
  } catch (e) {
    throw new Error(`Could not delete exercise record. ${e}`);
  }
};
