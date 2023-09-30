import logger from '../../../src/logger/logger';
import { updateRecord } from '../../../src/db/fast-food';

export default async (req, res) => {
  try {
    const updatedRecord = await updateRecord(req);

    res.status(200)
      .json(updatedRecord);
  } catch (error) {
    logger.error(error);
  }
};
