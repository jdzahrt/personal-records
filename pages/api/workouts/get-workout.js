import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { getWorkoutRecord } from '../../../db/workouts';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
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
