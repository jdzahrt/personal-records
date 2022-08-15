import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';
import logger from '../../../logger/logger';

export default async (req, res) => {
  const fastFoodId = req.query.id;

  const db = await GetDbConnection();
  const fastFoodCollection = db.collection('fastfood');

  try {
    const updateRecord = async () => {
      const newId = new mongodb.ObjectId(fastFoodId);

      const mongoUpdateRecord = {
        $set: {
          active: req.body.active,
          endDate: req.body.endDate,
        },
      };

      const result = await fastFoodCollection.findOneAndUpdate(
        { _id: newId },
        mongoUpdateRecord,
        { returnOriginal: false },
      );

      logger.info(
        `${result.ok} documents were updated with the _id: ${fastFoodId}`,
      );
    };

    await updateRecord();

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    logger.error(error);
  }
};
