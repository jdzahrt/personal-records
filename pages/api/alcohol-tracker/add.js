import logger from '../../../src/logger/logger';
import { insertRecord } from '../../../src/db/alcohol';
import { getSessionUser } from '../../../src/utils/get-session';

export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { quitDate } = req.body;

  try {
    const insertedRecord = await insertRecord(user, quitDate);

    return res.status(200).json(insertedRecord);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message || 'Failed to insert record' });
  }
};
