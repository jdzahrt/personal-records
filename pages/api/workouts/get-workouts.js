import { getServerSession } from 'next-auth/next';
import logger from '../../../logger/logger';
import { getWorkouts } from '../../../db/workouts';
import { authOptions } from '../auth/[...nextauth]';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(200)
      .json([]);
  }

  const user = session.user.email;

  try {
    const results = await getWorkouts(user);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
