import Link from 'next/link';
import styles from '../../styles/Home.module.css';

// eslint-disable-next-line react/prop-types
function WorkoutDetailId({ workoutId }) {
  return (
    <div className={styles.container}>
      <main>
        <title>Workout Detail</title>
        <center><h1>Workout Detail! 💪</h1></center>
        <ExcerciseDetail
          workoutId={workoutId}
        />
        <div className={styles.footer}>
          <Link href="/workout-tracker-v2">Back</Link>
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
export default WorkoutDetailId;
