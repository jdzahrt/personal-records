import logger from '../logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const workoutsCollection = db.collection('workouts');

export const getWorkouts = async (user) => workoutsCollection
  .find({ email: user })
  .sort({ active: -1 })
  .toArray();

export const getWorkoutRecord = async (workoutId) => workoutsCollection
  .findOne({ workoutId });

export const insertWorkout = async (payload) => {
  console.log('inserting workout', payload);
  const result = await workoutsCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteWorkout = async (workoutId) => {
  const result = await workoutsCollection.deleteOne({ _id: workoutId });

  logger.info(
    `${result.deletedCount} workout documents were deleted with the _id: ${workoutId}`,
  );
};

export const updateWorkout = async ({
  exercise, reps, date, weight, exerciseType, workoutId,
}) => {
  const mongoUpdateRecord = {
    $set: {
      exercise,
      reps,
      date: new Date(date),
      weight,
      exerciseType,
    },
  };

  const result = await workoutsCollection.updateOne({ _id: workoutId }, mongoUpdateRecord);

  logger.info(
    `${result.matchedCount} documents were updated with the _id: ${workoutId}`,
  );
};
