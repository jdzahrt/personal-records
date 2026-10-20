import mongodb from 'mongodb';
import logger from '../logger/logger';
import { GetDbConnection } from './db';

const getAlcoholCollection = async () => {
  const db = await GetDbConnection();
  if (!db || db instanceof Error || typeof db.collection !== 'function') {
    throw (db instanceof Error ? db : new Error('Database connection failed'));
  }
  return db.collection('alcohol');
};

export const getHistory = async (user) => {
  const alcoholCollection = await getAlcoholCollection();
  return alcoholCollection
    .find({ email: user })
    .sort({ active: -1 })
    .toArray();
};

export const insertRecord = async (user, quitDate) => {
  const alcoholCollection = await getAlcoholCollection();
  const insertPayload = {
    email: user,
    quitDate: new Date(quitDate),
    active: true,
  };

  const result = await alcoholCollection.insertOne(insertPayload);

  logger.info(
    `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
  );

  return result.ops[0];
};

export const deleteRecord = async (alcoholId) => {
  const alcoholCollection = await getAlcoholCollection();
  const newId = new mongodb.ObjectId(alcoholId);

  const result = await alcoholCollection.deleteOne({ _id: newId });

  logger.info(
    `${result.deletedCount} documents were deleted with the _id: ${alcoholId}`,
  );
};

export const updateRecord = async (req) => {
  const alcoholCollection = await getAlcoholCollection();
  const alcoholId = req.query.id;
  const newId = new mongodb.ObjectId(alcoholId);

  const mongoUpdateRecord = {
    $set: {
      active: req.body.active,
      endDate: new Date(req.body.endDate),
    },
  };

  const result = await alcoholCollection.findOneAndUpdate(
    { _id: newId },
    mongoUpdateRecord,
    { returnOriginal: false },
  );

  logger.info(
    `${result.ok} documents were updated with the _id: ${alcoholId}`,
  );

  return result.value;
};
