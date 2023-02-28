import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { getWorkouts, getWorkoutsTest } from '../../../db/workouts';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const user = session.user.email;

  try {
    // const results = await getWorkouts(user);
    const results = await getWorkoutsTest(user);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
