import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { workoutDTO } from '../../../models/dto';
import { getHistoryRecord } from '../../../db/workout';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getHistoryRecord(req.query.id);

    const dtoResults = workoutDTO(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};
