import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  console.log(req.query);
  const alcoholId = req.query.id;

  const db = await GetDbConnection();
  const alcoholCollection = db.collection('alcohol');

  try {
    const deleteRecord = async () => {
      const newId = new mongodb.ObjectId(alcoholId);

      const result = await alcoholCollection.deleteOne({ _id: newId });

      logger.info(
        `${result.deletedCount} documents were deleted with the _id: ${alcoholId}`,
      );
    };

    await deleteRecord();

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
