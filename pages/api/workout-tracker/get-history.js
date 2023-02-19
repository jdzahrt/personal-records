import { getSession } from 'next-auth/react';
import { getHistory } from '../../../db/workout';
import logger from '../../../logger/logger';
import { workoutDTOArray } from '../../../models/dto';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const userEmail = session.user.email;

  try {
    const results = await getHistory(userEmail);

    const dtoResults = await workoutDTOArray(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};
