import { getSession } from 'next-auth/react';
import { getMongoClient } from '../../../db/mongo';

export default async (req, res) => {
  // TODO: Handle users that are not signed in
  const session = await getSession({ req });
  const user = session.user.email;
  const { quitDate } = req.body;

  const client = await getMongoClient();
  const db = client.db('personal-records');
  const collectionName = 'alcohol';
  let insertedRecord;

  try {
    const insertRecord = async () => {
      const alcoholCollection = db.collection(collectionName);

      const insertPayload = {
        email: user,
        quitDate,
        active: true,
      };

      const result = await alcoholCollection.insertOne(insertPayload);
      [insertedRecord] = result.ops;

      console.log(
        `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
      );
    };

    await insertRecord()
      .catch(console.dir);

    res.status(200)
      .json(insertedRecord);
  } catch (error) {
    console.log('error', error);
  } finally {
    client.close();
  }
};
