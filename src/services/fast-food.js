import { fetchApi } from '../utils/fetch-api';
import { historyListMapper, historyObjectMapper } from '../models/history';

export const getFastFoodHistory = async () => {
  try {
    const response = await fetchApi('/api/fast-food-tracker/get-history', 'GET');

    const json = await response.json();

    return historyListMapper(json);
  } catch (e) {
    throw new Error(`Could not fetch fast-food history. ${e}`);
  }
};

export const addFastFood = async (payload) => {
  try {
    const response = await fetchApi('/api/fast-food-tracker/add', 'POST', { quitDate: payload.quitDate });

    const json = await response.json();

    return historyObjectMapper(json);
  } catch (e) {
    throw new Error(`Could not add fast-food record. ${e}`);
  }
};

export const updateFastFood = async (id, payload) => {
  try {
    const response = await fetchApi(`/api/fast-food-tracker/update?id=${id}`, 'PUT', payload);

    const json = await response.json();

    return historyObjectMapper(json);
  } catch (e) {
    throw new Error(`Could not update fast-food record. ${e}`);
  }
};

export const deleteFastFood = async (id) => {
  try {
    await fetchApi(`/api/fast-food-tracker/delete?id=${id}`, 'DELETE');
  } catch (e) {
    throw new Error(`Could not delete fast-food record. ${e}`);
  }
};
