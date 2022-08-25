import moment from 'moment';
import { fetchApi } from '../utils/fetch-api';

export const getFastFoodHistory = async () => {
  try {
    const response = await fetchApi('/api/fast-food-tracker/get-history', 'GET');

    const json = await response.json();

    return json.map((obj) => ({
      id: obj._id,
      active: obj.active,
      email: obj.email,
      quitDate: moment(new Date(obj.quitDate))
        .format('MM/DD/YY'),
      endDate: obj.endDate ? moment(new Date(obj.endDate))
        .format('MM/DD/YY') : null,
    }));
  } catch (e) {
    throw new Error(`Could not fetch fast-food history. ${e}`);
  }
};

export const addFastFood = async (payload) => {
  try {
    const response = await fetchApi('/api/fast-food-tracker/add', 'POST', { quitDate: payload.quitDate });

    const json = await response.json();

    return (() => ({
      id: json._id,
      active: json.active,
      email: json.email,
      quitDate: moment(new Date(json.quitDate))
        .format('MM/DD/YY'),
      endDate: json.endDate ? moment(new Date(json.endDate))
        .format('MM/DD/YY') : null,
    }))();
  } catch (e) {
    throw new Error(`Could not add fast-food record. ${e}`);
  }
};

export const updateFastFood = async (id, payload) => {
  try {
    const response = await fetchApi(`/api/fast-food-tracker/update?id=${id}`, 'PUT', payload);
    const json = await response.json();

    return (() => ({
      id: json._id,
      active: json.active,
      email: json.email,
      quitDate: moment(new Date(json.quitDate))
        .format('MM/DD/YY'),
      endDate: json.endDate ? moment(new Date(json.endDate))
        .format('MM/DD/YY') : null,
    }))();
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
