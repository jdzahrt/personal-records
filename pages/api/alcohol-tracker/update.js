import logger from '../../../src/logger/logger';
import { updateRecord } from '../../../src/db/alcohol';

export default async (req, res) => {
  console.log('REQUIZZY', req);
  try {
    const updatedRecord = await updateRecord(req);

    res.status(200)
      .json(updatedRecord);
  } catch (error) {
    logger.error(error);
  }
};
