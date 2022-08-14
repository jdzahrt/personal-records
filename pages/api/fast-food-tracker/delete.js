import mongodb from 'mongodb';
import { getMongoClient } from '../../../db/mongo';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const fastFoodId = req.query.id;
  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'fastfood';

  try {
    const deleteRecord = async () => {
      const fastFoodCollection = db.collection(collectionName);

      const newId = new mongodb.ObjectId(fastFoodId);

      const result = await fastFoodCollection.deleteOne({ _id: newId });

      logger.info(
        `${result.deletedCount} documents were deleted with the _id: ${fastFoodId}`,
      );
    };

    await deleteRecord()
      .catch(console.dir);

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    logger.error(error);
  } finally {
    client.close();
  }
};
