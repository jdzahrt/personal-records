import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  const { quitDate } = req.body;

  const db = await GetDbConnection();
  const alcoholCollection = db.collection('alcohol');

  let insertedRecord = {};

  try {
    const insertRecord = async () => {
      const insertPayload = {
        email: user,
        quitDate: new Date(quitDate),
        active: true,
      };

      const result = await alcoholCollection.insertOne(insertPayload);
      [insertedRecord] = result.ops;

      logger.info(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    };

    await insertRecord();

    res.status(200)
      .json(insertedRecord);
  } catch (error) {
    logger.error(error);
  }
};
