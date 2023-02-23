import logger from '../../../logger/logger';
import { updateRecord } from '../../../db/workout';

export default async (req, res) => {
  try {
    await updateRecord(req.body);

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    logger.error(error);
  }
};
