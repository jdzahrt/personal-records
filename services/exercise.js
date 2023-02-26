import { fetchApi } from '../utils/fetch-api';

export const getExercise = async () => {
  try {
    const response = await fetchApi('/api/exercise/get', 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch exercise info. ${e}`);
  }
};

export const getWorkoutExercises = async (workoutId) => {
  try {
    const response = await fetchApi('/api/exercise/get', 'GET');
    return response.json();
  } catch (e) {
    throw new Error(`Could not fetch exercise info. ${e}`);
  }
};

// export const getExerciseDetail = async (exerciseDetailId) => {
//   try {
//     const response = await fetchApi(`/api/exercise/get-exercise-detail?id=${exerciseDetailId}`, 'GET');
//     return response.json();
//   } catch (e) {
//     throw new Error(`Could not fetch exercise detail. ${e}`);
//   }
// };

export const addExercise = async (payload) => {
  try {
    await fetchApi('/api/exercise/add', 'POST', payload);
  } catch (e) {
    throw new Error(`Could not add exercise record. ${e}`);
  }
};

export const updateExercise = async (payload) => {
  try {
    await fetchApi(`/api/exercise/update?id=${payload.exerciseId}`, 'PUT', payload);
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
