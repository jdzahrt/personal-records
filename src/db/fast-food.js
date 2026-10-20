import mongodb from 'mongodb';
import logger from '../logger/logger';
import { getCollection } from './db';

export const insertRecord = async (user, quitDate) => {
  const collection = await getCollection('fastfood');
  const insertPayload = {
    email: user,
    quitDate: new Date(quitDate),
    active: true,
  };

  const result = await collection.insertOne(insertPayload);

  logger.info(
    `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const getHistory = async (user) => {
  const collection = await getCollection('fastfood');
  return collection
    .find({ email: user })
    .sort({ active: -1 })
    .toArray();
};

export const deleteRecord = async (fastFoodId) => {
  const collection = await getCollection('fastfood');
  const newId = new mongodb.ObjectId(fastFoodId);

  const result = await collection.deleteOne({ _id: newId });

  logger.info(
    `${result.deletedCount} documents were deleted with the _id: ${fastFoodId}`,
  );
};

export const updateRecord = async (req) => {
  const collection = await getCollection('fastfood');
  const fastFoodId = req.query.id;
  const newId = new mongodb.ObjectId(fastFoodId);

  const mongoUpdateRecord = {
    $set: {
      active: req.body.active,
      endDate: new Date(req.body.endDate),
    },
  };

  const result = await collection.findOneAndUpdate(
    { _id: newId },
    mongoUpdateRecord,
    { returnOriginal: false },
  );

  logger.info(
    `${result.ok} documents were updated with the _id: ${fastFoodId}`,
  );

  return result.value;
};
