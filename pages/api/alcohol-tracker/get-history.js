import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const userEmail = session.user.email;
  const db = await GetDbConnection();

  const getHistory = async () => db.collection('alcohol')
    .find({ email: userEmail })
    .sort({ active: -1 })
    .toArray();

  try {
    const results = await getHistory();

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
