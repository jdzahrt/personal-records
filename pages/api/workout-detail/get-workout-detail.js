import logger from '../../../src/logger/logger';
import { getHistoryRecord } from '../../../src/db/workout';
import { dataToModel } from '../../../src/models/dto';
import { getSessionUser } from '../../../src/utils/get-session';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(200)
      .json([]);
  }

  try {
    const results = await getHistoryRecord(req.query.id);

    const dtoResults = dataToModel(results);

    res.status(200)
      .json(dtoResults);
  } catch (error) {
    logger.error(error);
  }
};
