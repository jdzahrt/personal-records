import { getSession } from 'next-auth/react';
import logger from '../../../logger/logger';
import { insertWorkoutExercise } from '../../../db/exercises';

export default async (req, res) => {
  const session = await getSession({ req });
  const user = session.user.email;

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
