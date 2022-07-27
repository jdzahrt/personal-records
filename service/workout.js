import {fetchApi} from "../utils/fetch-api";

export const getWorkoutHistory = async () => {
    try {
        const response = await fetchApi(`/api/workout-tracker/get-history`, 'GET');
        return response.json();
    } catch {
        throw new Error('Could not fetch workout history')
    }
}

export const addWorkout = async (payload) => {
    try {
        await fetchApi('/api/workout-tracker/add', 'POST', payload)
    } catch (e) {
        throw new Error(`Could not add workout record. ${e}`)
    }
}

export const updateWorkout = async (payload) => {
    try {
        await fetchApi(`/api/workout-tracker/update?id=${payload._id}`, 'PUT', payload)
    } catch (e) {
        throw new Error(`Could not update workout record. ${e}`)
    }
}

export const deleteWorkout = async (id) => {
    try {
        await fetchApi(`/api/workout-tracker/delete?id=${id}`, 'DELETE')
    } catch (e) {
        throw new Error(`Could not delete workout record. ${e}`)
    }
}