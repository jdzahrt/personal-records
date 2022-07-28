import { fetchApi } from '../utils/fetch-api';

export const getAlcoholHistory = async () => {
  try {
    const response = await fetchApi('/api/alcohol-tracker/get-history', 'GET');
    return response.json();
  } catch {
    throw new Error('Could not fetch alcohol history');
  }
};

export const addAlcohol = async (payload) => {
  try {
    const response = await fetchApi('/api/alcohol-tracker/add', 'POST', { quitDate: payload.quitDate });
    return response.json();
  } catch (e) {
    throw new Error(`Could not add alcohol record. ${e}`);
  }
};

export const updateAlcohol = async (id, payload) => {
  try {
    const response = await fetchApi(`/api/alcohol-tracker/update?id=${id}`, 'PUT', payload);
    return response.json();
  } catch (e) {
    throw new Error(`Could not update alcohol record. ${e}`);
  }
};

export const deleteAlcohol = async (id) => {
  try {
    await fetchApi(`/api/alcohol-tracker/delete?id=${id}`, 'DELETE');
  } catch (e) {
    throw new Error(`Could not delete alcohol record. ${e}`);
  }
};
