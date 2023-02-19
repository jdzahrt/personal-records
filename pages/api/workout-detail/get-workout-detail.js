import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';
import { workoutDTO } from '../../../models/dto';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const db = await GetDbConnection();

  const getHistoryRecord = async () => db.collection('workout')
    .findOne({ _id: req.query.id });

  try {
    const results = await getHistoryRecord();

    const dtoResults = workoutDTO(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};
