import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  console.log('req', req.query);
  const workoutId = req.query.id;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const deleteRecord = async () => {
      const result = await workoutCollection.deleteOne({ _id: workoutId });

      logger.info(
        `${result.deletedCount} documents were deleted with the _id: ${workoutId}`,
      );
    };

    await deleteRecord();

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
