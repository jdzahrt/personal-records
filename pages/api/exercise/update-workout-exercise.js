import logger from '../../../src/logger/logger';
import { updateWorkoutExercise } from '../../../src/db/exercises';

export default async (req, res) => {
  try {
    await updateWorkoutExercise(req.body);

    res.status(200)
      .json({ status: 'Update workout exercise successfully' });
  } catch (error) {
    logger.error(error);
  }
};
