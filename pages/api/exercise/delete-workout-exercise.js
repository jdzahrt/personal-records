import logger from '../../../src/logger/logger';
import { deleteWorkoutExercise } from '../../../db/exercises';

export default async (req, res) => {
  const workoutExerciseId = req.query.id;

  try {
    await deleteWorkoutExercise(workoutExerciseId);

    res.status(200)
      .json({ status: 'Deleted Workout Exercise Successfully' });
  } catch (error) {
    logger.error(error);
  }
};
