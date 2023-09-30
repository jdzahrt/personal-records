import logger from '../../../src/logger/logger';
import { deleteRecord } from '../../../db/alcohol';

export default async (req, res) => {
  const alcoholId = req.query.id;

  try {
    await deleteRecord(alcoholId);

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
