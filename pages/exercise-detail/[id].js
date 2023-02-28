import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import ExerciseDetail from '../../components/exercise-detail';

// eslint-disable-next-line react/prop-types
function WorkoutExerciseDetail({ workoutExerciseId }) {
  return (
    <div className={styles.container}>
      <main>
        <title>Exercise Detail</title>
        <center><h1>Exercise Detail</h1></center>
        <ExerciseDetail
          workoutExerciseId={workoutExerciseId}
        />
        <div className={styles.footer}>
          <Link href="/workouts-tracker">Back</Link>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = (context) => ({
  props: {
    workoutExerciseId: context.params.id,
  },
});
export default WorkoutExerciseDetail;
