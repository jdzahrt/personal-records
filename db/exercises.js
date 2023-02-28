import logger from '../logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const workoutExercisesCollection = db.collection('workout-exercises');

export const getExercises = async (user) => workoutExercisesCollection
  .find({ email: user })
  .sort({ active: -1 })
  .toArray();

export const getExerciseRecord = async (exerciseId) => workoutExercisesCollection
  .findOne({ exerciseId });

export const getWorkoutExercises = async (workoutId) => workoutExercisesCollection
  .find({ workoutId })
  .sort({ active: -1 })
  .toArray();

export const insertWorkoutExercise = async (payload) => {
  console.log('inserting workout exercise', payload);
  const result = await workoutExercisesCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout exercise documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteExercise = async (exerciseId) => {
  const result = await workoutExercisesCollection.deleteOne({ exerciseId });

  logger.info(
    `${result.deletedCount} workout document deleted with the _id: ${exerciseId}`,
  );
};

export const updateExercise = async ({
  exercise, reps, date, weight, exerciseType, exerciseId,
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

  const result = await workoutExercisesCollection.updateOne({ _id: exerciseId }, mongoUpdateRecord);

  logger.info(
    `${result.matchedCount} documents were updated with the _id: ${exerciseId}`,
  );
};
