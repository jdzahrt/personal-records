import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import ExerciseList from '../../components/exercise-list';

// eslint-disable-next-line react/prop-types
function WorkoutList({ workoutId }) {
  return (
    <div className={styles.container}>
      <main>
        <title>Workout Detail</title>
        <center><h1>Workout Detailz! 💪</h1></center>
        <ExerciseList
          workoutId={workoutId}
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
    workoutId: context.params.id,
  },
});
export default WorkoutList;
