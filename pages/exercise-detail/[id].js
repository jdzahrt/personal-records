import { Link } from '@nextui-org/react';

import PropTypes from 'prop-types';
import styles from '../../styles/Home.module.css';
import ExerciseDetail from '../../components/exercise-detail';

function WorkoutExerciseDetail({
  workoutExerciseId,
  workoutId,
  previousURL,
}) {
  WorkoutExerciseDetail.propTypes = {
    workoutExerciseId: PropTypes.string.isRequired,
    workoutId: PropTypes.string.isRequired,
    previousURL: PropTypes.string.isRequired,
  };

  return (
    <div className={styles.container}>
      <main>
        <title>Exercise Detail</title>
        <ExerciseDetail
          workoutExerciseId={workoutExerciseId}
          workoutId={workoutId}
        />
        <div className={styles.footer}>
          <Link block color="primary" href={previousURL}>
            Back
          </Link>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = (context) => ({
  props: {
    workoutExerciseId: context.query.id,
    workoutId: context.query.workoutId,
    previousURL: context.req.headers.referer,
  },
});
export default WorkoutExerciseDetail;
