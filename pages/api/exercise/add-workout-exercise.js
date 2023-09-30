import logger from '../../../src/logger/logger';
import { insertWorkoutExercise } from '../../../db/exercises';
import { getSessionUser } from '../../../utils/get-session';

// eslint-disable-next-line consistent-return
export default async (req, res) => {
  const user = await getSessionUser(req, res);
  if (!user) {
    return res.status(200)
      .json([]);
  }

  try {
    const insertPayload = {
      workoutExerciseId: req.body.workoutExerciseId,
      workoutId: req.body.workoutId,
      exercise: req.body.exercise,
      reps: req.body.reps,
      weight: req.body.weight,
      date: req.body.date,
    };

    await insertWorkoutExercise(insertPayload);

    res.status(200)
      .json({ status: 'Success' });
  } catch (error) {
    logger.error(error);
  }
};
