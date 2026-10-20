import logger from '../logger/logger';
import { getCollection } from './db';

export const getHistory = async (user) => {
  const workoutCollection = await getCollection('workout');
  return workoutCollection
    .find({ email: user })
    .sort({ active: -1 })
    .toArray();
};

export const getHistoryRecord = async (workoutId) => {
  const workoutCollection = await getCollection('workout');
  return workoutCollection.findOne({ _id: workoutId });
};

export const insertRecord = async (payload) => {
  const workoutCollection = await getCollection('workout');
  const result = await workoutCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteRecord = async (workoutId) => {
  const workoutCollection = await getCollection('workout');
  const result = await workoutCollection.deleteOne({ _id: workoutId });

  logger.info(
    `${result.deletedCount} workout documents were deleted with the _id: ${workoutId}`,
  );
};

export const updateRecord = async ({
  exercise, reps, date, weight, exerciseType, workoutId,
}) => {
  const workoutCollection = await getCollection('workout');
  const mongoUpdateRecord = {
    $set: {
      exercise,
      reps,
      date: new Date(date),
      weight,
      exerciseType,
    },
  };

  const result = await workoutCollection.updateOne({ _id: workoutId }, mongoUpdateRecord);

  logger.info(
    `${result.matchedCount} documents were updated with the _id: ${workoutId}`,
  );
};
