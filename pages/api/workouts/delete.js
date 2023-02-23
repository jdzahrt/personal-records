import logger from '../../../logger/logger';
import { deleteRecord } from '../../../db/workout';

export default async (req, res) => {
  const workoutId = req.query.id;

  try {
    await deleteRecord(workoutId);

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
