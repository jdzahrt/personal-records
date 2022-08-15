import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';

export default async (req, res) => {
  const alcoholId = req.query.id;

  const db = await GetDbConnection();
  const alcoholCollection = db.collection('alcohol');

  try {
    const deleteRecord = async () => {
      const newId = new mongodb.ObjectId(alcoholId);

      const result = await alcoholCollection.deleteOne({ _id: newId });

      console.log(
        `${result.deletedCount} documents were deleted with the _id: ${alcoholId}`,
      );
    };

    await deleteRecord();

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    console.log('error', error);
  }
};
