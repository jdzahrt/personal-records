import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const {
    _id,
    exercise,
    reps,
    date,
    weight,
  } = req.body;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const updateRecord = async () => {
      const mongoUpdateRecord = {
        $set: {
          exercise,
          reps,
          date,
          weight,
        },
      };

      const result = await workoutCollection.updateOne({ _id }, mongoUpdateRecord);

      logger.info(
        `${result.matchedCount} documents were updated with the _id: ${_id}`,
      );
    };

    await updateRecord();

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    logger.error(error);
  }
};
