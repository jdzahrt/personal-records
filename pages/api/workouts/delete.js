import logger from '../../../src/logger/logger';
import { deleteWorkout } from '../../../db/workouts';

export default async (req, res) => {
  const workoutId = req.query.id;

  try {
    await deleteWorkout(workoutId);

    res.status(200)
      .json({ status: 'Deleted Workout Successfully' });
  } catch (error) {
    logger.error(error);
  }
};
