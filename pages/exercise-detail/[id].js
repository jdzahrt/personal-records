import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import ExerciseDetail from '../../components/exercise-detail';

// eslint-disable-next-line react/prop-types
function WorkoutExerciseDetail({ workoutExerciseId, workoutId, workoutName }) {
  return (
    <div className={styles.container}>
      <main>
        <title>Exercise Detail</title>
        <ExerciseDetail
          workoutExerciseId={workoutExerciseId}
          workoutId={workoutId}
        />
        <div className={styles.footer}>
          <Link href={{
            pathname: '/workout-exercise-list/[id]',
            query: {
              id: workoutId,
              name: workoutName,
            },
          }}
          >
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
  },
});
export default WorkoutExerciseDetail;
