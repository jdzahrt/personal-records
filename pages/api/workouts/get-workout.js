import { getServerSession } from 'next-auth/next';
import logger from '../../../logger/logger';
import { getWorkoutRecord } from '../../../db/workouts';
import { authOptions } from '../auth/[...nextauth]';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getWorkoutRecord(req.query.workoutId);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
