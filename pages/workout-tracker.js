import Link from 'next/link';
import styles from '../styles/Home.module.css';
import WorkoutHistory from '../components/workout-history';

function WorkoutTracker() {
  return (
    <div className={styles.container}>
      <main>
        <center><h1>Workout Tracker!</h1></center>
        <WorkoutHistory />
        <Link href="/" className={styles.footer}>Home</Link>
      </main>
    </div>
  );
}

export default WorkoutTracker;
