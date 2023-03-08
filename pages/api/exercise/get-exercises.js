import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { getExercises } from '../../../db/exercises';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const user = session.user.email;

  try {
    const results = await getExercises(user);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
