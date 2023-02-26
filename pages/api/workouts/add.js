import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import logger from '../../../logger/logger';
import { insertWorkout } from '../../../db/workouts';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;
  console.log('add workout', req.body);

  try {
    const insertPayload = {
      workoutId: uuidv4(),
      email: user,
      workout: req.body.workout,
      workoutType: req.body.workoutType,
    };

    await insertWorkout(insertPayload);

    res.status(200)
      .json({ status: 'Success' });
  } catch (error) {
    logger.error(error);
  }
};
