import mongodb from 'mongodb';
import logger from '../logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const workoutCollection = db.collection('workout');

export const getHistory = async (user) => workoutCollection
  .find({ email: user })
  .sort({ active: -1 })
  .toArray();

export const insertRecord = async (payload) => {
  const result = await workoutCollection.insertOne(payload);

  logger.info(
    `${result.insertedCount} workout documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteRecord = async (workoutId) => {
  const result = await workoutCollection.deleteOne({ _id: workoutId });

  logger.info(
    `${result.deletedCount} workout documents were deleted with the _id: ${workoutId}`,
  );
};

export const updateRecord = async (req) => {
  const workoutId = req.query.id;
  const newId = new mongodb.ObjectId(workoutId);

  const mongoUpdateRecord = {
    $set: {
      active: req.body.active,
      endDate: new Date(req.body.endDate),
    },
  };

  const result = await workoutCollection.findOneAndUpdate(
    { _id: newId },
    mongoUpdateRecord,
    { returnOriginal: false },
  );

  logger.info(
    `${result.ok} documents were updated with the _id: ${workoutId}`,
  );

  return result.value;
};
