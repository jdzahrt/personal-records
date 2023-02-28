import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { getWorkoutExercises } from '../../../db/exercises';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getWorkoutExercises(req.query.workoutId);

    console.log('results', results);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
