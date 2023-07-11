import logger from '../../../logger/logger';
import { getWorkoutExercises } from '../../../db/exercises';
import { getSessionUser } from '../../../utils/get-session';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getWorkoutExercises(req.query.workoutId);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
