import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const fastFoodId = req.query.id;

  const db = await GetDbConnection();
  const fastFoodCollection = db.collection('fastfood');

  try {
    const deleteRecord = async () => {
      const newId = new mongodb.ObjectId(fastFoodId);

      const result = await fastFoodCollection.deleteOne({ _id: newId });

      logger.info(
        `${result.deletedCount} documents were deleted with the _id: ${fastFoodId}`,
      );
    };

    await deleteRecord();

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  }
};
