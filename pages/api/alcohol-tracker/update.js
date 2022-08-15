import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';

export default async (req, res) => {
  const alcoholId = req.query.id;

  const db = await GetDbConnection();
  const alcoholCollection = db.collection('alcohol');

  let updatedRecord;

  try {
    const updateRecord = async () => {
      const newId = new mongodb.ObjectId(alcoholId);

      const mongoUpdateRecord = {
        $set: {
          active: req.body.active,
          endDate: req.body.endDate,
        },
      };

      const result = await alcoholCollection.findOneAndUpdate(
        { _id: newId },
        mongoUpdateRecord,
        { returnOriginal: false },
      );

      updatedRecord = result.value;

      console.log(
        `${result.ok} documents were updated with the _id: ${alcoholId}`,
      );
    };

    await updateRecord();

    res.status(200)
      .json(updatedRecord);
  } catch (error) {
    console.log('error', error);
  }
};
