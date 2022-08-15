import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';

export default async (req, res) => {
  const workoutId = req.query.id;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const deleteRecord = async () => {
      const newId = new mongodb.ObjectId(workoutId);

      const result = await workoutCollection.deleteOne({ _id: newId });

      console.log(
        `${result.deletedCount} documents were deleted with the _id: ${workoutId}`,
      );
    };

    await deleteRecord();

    res.status(200)
      .json({ status: 'Delete Success' });
  } catch (error) {
    console.log('error', error);
  }
};
