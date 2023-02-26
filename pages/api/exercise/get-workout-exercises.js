import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const user = session.user.email;

  try {
    // TODO: get exercises from database
    // const results = await getWorkoutExercises(user);
    // const dtoResults = dataToModel(results);

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
