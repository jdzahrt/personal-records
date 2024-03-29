import logger from '../../../src/logger/logger';
import { updateRecord } from '../../../src/db/workout';

export default async (req, res) => {
  try {
    await updateRecord(req.body);

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    logger.error(error);
  }
};
