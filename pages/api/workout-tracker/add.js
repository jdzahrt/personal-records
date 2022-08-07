import { getSession } from 'next-auth/react';
import { getMongoClient } from '../../../db/mongo';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  const {
    date,
    reps,
    exercise,
    weight,
  } = req.body;

  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'workout';

  try {
    const insertRecord = async () => {
      const workoutCollection = db.collection(collectionName);

      const insertPayload = {
        email: user,
        exercise,
        date,
        reps,
        weight,
      };

      const result = await workoutCollection.insertOne(insertPayload);

      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    };

    await insertRecord()
      .catch(console.dir);

    res.status(200)
      .json({ status: 'Success' });
  } catch (error) {
    console.log('error', error);
  } finally {
    client.close();
  }
};
