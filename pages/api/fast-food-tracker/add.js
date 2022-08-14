import { getSession } from 'next-auth/react';
import { getMongoClient } from '../../../db/mongo';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  const { quitDate } = req.body;

  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'fastfood';
  let insertedRecord;

  try {
    const insertRecord = async () => {
      const fastFoodCollection = db.collection(collectionName);

      const insertPayload = {
        email: user,
        quitDate,
        active: true,
      };

      const result = await fastFoodCollection.insertOne(insertPayload);
      [insertedRecord] = result.ops;

      logger.info(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    };

    await insertRecord().catch(console.dir);

    res.status(200).json(insertedRecord);
  } catch (error) {
    logger.error(error);
  } finally {
    client.close();
  }
};
