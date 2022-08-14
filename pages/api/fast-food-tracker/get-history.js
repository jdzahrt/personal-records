import { getSession } from 'next-auth/react';
import { GetDbConnection } from '../../../db/db';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(200)
      .json([]);
  }

  const userEmail = session.user.email;
  const db = await GetDbConnection();

  const getHistory = async () => db.collection('fastfood')
    .find({ email: userEmail })
    .sort({ active: -1 })
    .toArray();

  try {
    const results = await getHistory();

    res.status(200)
      .json(results);
  } catch (error) {
    console.log(error);
  }
};
