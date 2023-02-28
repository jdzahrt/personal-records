import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { dataToModelArray } from '../../../models/dto';
import { getWorkoutRecord } from '../../../db/workouts';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const userEmail = session.user.email;

  try {
    const results = await getWorkoutRecord(workoutId);

    // const dtoResults = await dataToModelArray(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};