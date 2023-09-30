import { fetchApi } from '../../utils/fetch-api';
import { historyListMapper, historyObjectMapper } from '../../models/history';

export const getAlcoholHistory = async () => {
  try {
    const response = await fetchApi('/api/alcohol-tracker/get-history', 'GET');

    const json = await response.json();

    return historyListMapper(json);
  } catch (e) {
    throw new Error(`Could not fetch alcohol history. ${e}`);
  }
};

export const addAlcohol = async (payload) => {
  try {
    const response = await fetchApi('/api/alcohol-tracker/add', 'POST', { quitDate: payload.quitDate });

    const json = await response.json();

    return historyObjectMapper(json);
  } catch (e) {
    throw new Error(`Could not add alcohol record. ${e}`);
  }
};

export const updateAlcohol = async (id, payload) => {
  try {
    const response = await fetchApi(`/api/alcohol-tracker/update?id=${id}`, 'PUT', payload);

    const json = await response.json();

    return historyObjectMapper(json);
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
