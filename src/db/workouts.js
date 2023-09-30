import logger from '../logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const workoutsCollection = db.collection('workouts');

export const getWorkouts = async (user) => workoutsCollection.aggregate([
  {
    $project: { w: '$$ROOT', _id: 0 },
  },
  {
    $lookup: {
      localField: 'w.workoutId',
      from: 'workout-exercises',
      foreignField: 'workoutId',
      as: 'we',
    },
  },
  {
    $unwind: {
      path: '$we',
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $match: { 'w.email': { $eq: user } },
  },
  {
    $group: {
      _id: { workoutId: '$w.workoutId', workout: '$w.workout', workoutType: '$w.workoutType' },
      'max(we_date)': { $max: '$we.date' },
      'count(*)': { $sum: 1 },
    },
  },
  {
    $project: {
      workoutId: '$_id.workoutId', workout: '$_id.workout', workoutType: '$_id.workoutType', date: '$max(we_date)', exerciseCount: '$count(*)', _id: 0,
    },
  },
]).toArray();

export const getWorkoutRecord = async (workoutId) => workoutsCollection
  .findOne({ workoutId });

export const insertWorkout = async (payload) => {
  const result = await workoutsCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteWorkout = async (workoutId) => {
  const result = await workoutsCollection.deleteOne({ workoutId });

  logger.info(
    `${result.deletedCount} workout document deleted with the _id: ${workoutId}`,
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
