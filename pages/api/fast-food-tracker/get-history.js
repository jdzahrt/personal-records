import { getSession } from 'next-auth/react';
// import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';
import { getHistory } from '../../../db/fast-food';

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

    res.status(200)
      .json(results);
  } catch (error) {
    logger.error(error);
  }
};
