import { getServerSession } from 'next-auth/next';
import logger from '../../../src/logger/logger';
import { getWorkouts } from '../../../db/workouts';
import { authOptions } from '../auth/[...nextauth]';
import { getSessionUser } from '../../../utils/get-session';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getWorkouts(user);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
