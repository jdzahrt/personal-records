import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  const {
    date,
    reps,
    exercise,
    weight,
    _id,
  } = req.body;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const insertRecord = async () => {
      const insertPayload = {
        email: user,
        exercise,
        date,
        reps,
        weight,
        _id,
      };

      const result = await workoutCollection.insertOne(insertPayload);

      logger.info(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    };

    await insertRecord();

    res.status(200)
      .json({ status: 'Success' });
  } catch (error) {
    logger.error(error);
  }
};
