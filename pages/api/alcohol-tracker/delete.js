import mongodb from 'mongodb';
import { getMongoClient } from '../../../db/mongo';

export default async (req, res) => {
  const alcoholId = req.query.id;
  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'alcohol';

  try {
    const deleteRecord = async () => {
      const alcoholCollection = db.collection(collectionName);

      const newId = new mongodb.ObjectId(alcoholId);

      const result = await alcoholCollection.deleteOne({ _id: newId });

      console.log(
        `${result.deletedCount} documents were deleted with the _id: ${alcoholId}`,
      );
    };

    await deleteRecord()
      .catch(console.dir);

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    console.log('error', error);
  } finally {
    client.close();
  }
};
