import logger from '../../../src/logger/logger';
import { deleteRecord } from '../../../src/db/fast-food';

export default async (req, res) => {
  const fastFoodId = req.query.id;

  try {
    await deleteRecord(fastFoodId);

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
