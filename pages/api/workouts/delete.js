import logger from '../../../logger/logger';
import { deleteWorkout } from '../../../db/workouts';

export default async (req, res) => {
  const workoutId = req.query.id;

  try {
    console.log('workoutId', workoutId, req.query);
    await deleteWorkout(workoutId);

    res.status(200)
      .json({ status: 'Deleted Workout Successfully' });
  } catch (error) {
    logger.error(error);
  }
};
