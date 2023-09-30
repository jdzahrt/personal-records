import logger from '../../../src/logger/logger';
import { insertWorkout } from '../../../src/db/workouts';
import { getSessionUser } from '../../../src/utils/get-session';

export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(200)
      .json([]);
  }

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
