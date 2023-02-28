import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { insertWorkout } from '../../../db/workouts';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;

  try {
    const insertPayload = {
      workoutId: req.body.workoutId,
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
