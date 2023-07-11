import logger from '../../../logger/logger';
import { insertRecord } from '../../../db/alcohol';
import { getSessionUser } from '../../../utils/get-session';

export default async (req, res) => {
  const user = await getSessionUser(req, res);
  const { quitDate } = req.body;

  try {
    const insertedRecord = await insertRecord(user, quitDate);

    res.status(200).json(insertedRecord);
  } catch (error) {
    logger.error(error);
  }
};
