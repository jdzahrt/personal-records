import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { insertRecord } from '../../../db/alcohol';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  const { quitDate } = req.body;

  try {
    const insertedRecord = await insertRecord(user, quitDate);

    res.status(200).json(insertedRecord);
  } catch (error) {
    logger.error(error);
  }
};
