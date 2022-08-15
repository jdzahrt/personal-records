import mongodb from 'mongodb';
import { GetDbConnection } from '../../../db/db';

export default async (req, res) => {
  const {
    _id,
    exercise,
    reps,
    date,
    weight,
  } = req.body;

  const db = await GetDbConnection();
  const workoutCollection = db.collection('workout');

  try {
    const updateRecord = async () => {
      const newId = new mongodb.ObjectId(_id);

      const mongoUpdateRecord = {
        $set: {
          exercise,
          reps,
          date,
          weight,
        },
      };

      const result = await workoutCollection.updateOne({ _id: newId }, mongoUpdateRecord);

      console.log(
        `${result.matchedCount} documents were updated with the _id: ${_id}`,
      );
    };

    await updateRecord();

    res.status(200)
      .json({ status: 'Update Success' });
  } catch (error) {
    console.log('error', error);
  }
};
