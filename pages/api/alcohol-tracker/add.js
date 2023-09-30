import logger from '../../../src/logger/logger';
import { insertRecord } from '../../../src/db/alcohol';
import { getSessionUser } from '../../../src/utils/get-session';

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
