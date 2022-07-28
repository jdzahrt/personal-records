import mongodb from 'mongodb';
import { getMongoClient } from '../../../db/mongo';

export default async (req, res) => {
  const alcoholId = req.query.id;
  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'alcohol';
  let updatedRecord;

  try {
    const updateRecord = async () => {
      const alcoholCollection = db.collection(collectionName);

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

    await updateRecord()
      .catch(console.dir);

    res.status(200)
      .json(updatedRecord);
  } catch (error) {
    console.log('error', error);
  } finally {
    await client.close();
  }
};
