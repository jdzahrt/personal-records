import mongodb from 'mongodb';
import logger from '../src/logger/logger';
import { GetDbConnection } from './db';

const db = await GetDbConnection();
const fastFoodCollection = db.collection('fastfood');

export const insertRecord = async (user, quitDate) => {
  const insertPayload = {
    email: user,
    quitDate: new Date(quitDate),
    active: true,
  };

  const result = await fastFoodCollection.insertOne(insertPayload);

  logger.info(
    `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const getHistory = async (user) => fastFoodCollection
  .find({ email: user })
  .sort({ active: -1 })
  .toArray();

export const deleteRecord = async (fastFoodId) => {
  const newId = new mongodb.ObjectId(fastFoodId);

  const result = await fastFoodCollection.deleteOne({ _id: newId });

  logger.info(
    `${result.deletedCount} documents were deleted with the _id: ${fastFoodId}`,
  );
};

export const updateRecord = async (req) => {
  const fastFoodId = req.query.id;
  const newId = new mongodb.ObjectId(fastFoodId);

  const mongoUpdateRecord = {
    $set: {
      active: req.body.active,
      endDate: new Date(req.body.endDate),
    },
  };

  const result = await fastFoodCollection.findOneAndUpdate(
    { _id: newId },
    mongoUpdateRecord,
    { returnOriginal: false },
  );

  logger.info(
    `${result.ok} documents were updated with the _id: ${fastFoodId}`,
  );

  return result.value;
};
