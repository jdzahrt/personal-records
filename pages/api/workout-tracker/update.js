import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const {
    workoutId,
    exercise,
    reps,
    date,
    weight,
    exerciseType,
  } = req.body;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const updateRecord = async () => {
      const mongoUpdateRecord = {
        $set: {
          exercise,
          reps,
          date: new Date(date),
          weight,
          exerciseType,
        },
      };

      const result = await workoutCollection.updateOne({ _id: workoutId }, mongoUpdateRecord);

      logger.info(
        `${result.matchedCount} documents were updated with the _id: ${workoutId}`,
      );
    };

    await updateRecord();

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    logger.error(error);
  }
};
