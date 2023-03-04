import logger from '../logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const workoutExercisesCollection = db.collection('workout-exercises');

export const getWorkoutExercise = async (workoutExerciseId) => workoutExercisesCollection
  .findOne({ workoutExerciseId });

export const getWorkoutExercises = async (workoutId) => workoutExercisesCollection
  .find({ workoutId })
  .sort({ active: -1 })
  .toArray();

export const insertWorkoutExercise = async (payload) => {
  const result = await workoutExercisesCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout exercise documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteWorkoutExercise = async (workoutExerciseId) => {
  const result = await workoutExercisesCollection.deleteOne({ workoutExerciseId });

  logger.info(
    `${result.deletedCount} workout exercise document deleted with the _id: ${workoutExerciseId}`,
  );
};

export const updateWorkoutExercise = async ({
  exercise, reps, date, weight, exerciseType, workoutExerciseId,
}) => {
  const mongoUpdateRecord = {
    $set: {
      exercise,
      reps,
      date,
      weight,
      exerciseType,
    },
  };

  const result = await workoutExercisesCollection.updateOne({ workoutExerciseId }, mongoUpdateRecord);

  logger.info(
    `${result.matchedCount} documents were updated with the _id: ${workoutExerciseId}`,
  );
};
