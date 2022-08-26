import logger from '../../../logger/logger';
import { updateRecord } from '../../../db/fast-food';

export default async (req, res) => {
  try {
    const updatedRecord = await updateRecord(req);

    res.status(200)
      .json(updatedRecord);
  } catch (error) {
    logger.error(error);
  }
};
