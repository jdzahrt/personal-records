import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import WorkoutDetail from '../../components/workout-detail';

// eslint-disable-next-line react/prop-types
function WorkoutDetailId({ workoutDetailId }) {
  return (
    <div className={styles.container}>
      <main>
        <title>Workout Detail</title>
        <center><h1>Workout Detail! 💪</h1></center>
        <WorkoutDetail
          workoutDetailId={workoutDetailId}
        />
        <div className={styles.footer}>
          <Link href="/">Home</Link>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = (context) => ({
  props: {
    workoutDetailId: context.params.id,
  },
});
export default WorkoutDetailId;
