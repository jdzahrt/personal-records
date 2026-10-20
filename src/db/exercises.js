import logger from '../logger/logger';
import { getCollection } from './db';

export const getWorkoutExercise = async (workoutExerciseId) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
  return workoutExercisesCollection.findOne({ workoutExerciseId });
};

export const getWorkoutExercises = async (workoutId) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
  return workoutExercisesCollection
    .find({ workoutId })
    .sort({ active: -1 })
    .toArray();
};

export const getExercises = async (user) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
  return workoutExercisesCollection.aggregate([
    {
      $lookup: {
        localField: 'workoutId',
        from: 'workouts',
        foreignField: 'workoutId',
        as: 'w',
      },
    },
    {
      $match: { 'w.email': { $eq: user } },
    },
  ]).toArray();
};

export const insertWorkoutExercise = async (payload) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
  const result = await workoutExercisesCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout exercise documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteWorkoutExercise = async (workoutExerciseId) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
  const result = await workoutExercisesCollection.deleteOne({ workoutExerciseId });

  logger.info(
    `${result.deletedCount} workout exercise document deleted with the _id: ${workoutExerciseId}`,
  );
};

export const updateWorkoutExercise = async ({
  exercise, reps, date, weight, exerciseType, workoutExerciseId,
}) => {
  const workoutExercisesCollection = await getCollection('workout-exercises');
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
