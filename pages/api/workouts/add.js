import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { insertRecord } from '../../../db/workout';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;

  try {
    const insertPayload = {
      _id: req.body._id,
      email: user,
      exercise: req.body.exercise,
      date: new Date(req.body.date),
      reps: req.body.reps,
      weight: req.body.weight,
      exerciseType: req.body.exerciseType,
    };

    await insertRecord(insertPayload);

    res.status(200)
      .json({ status: 'Success' });
  } catch (error) {
    logger.error(error);
  }
};
