import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';
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
  const db = await GetDbConnection();

  const getHistory = async () => db.collection('workout')
    .find({ email: userEmail })
    .sort({ active: -1 })
    .toArray();

  try {
    const results = await getHistory();

    const dtoResults = await workoutDTOArray(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};
