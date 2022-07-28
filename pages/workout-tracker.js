import styles from '../styles/Home.module.css';
import WorkoutHistory from '../components/workout-history';

function WorkoutTracker() {
  return (
    <div className={styles.container}>
      <main>
        <center><h1>Workout Tracker!</h1></center>
        <WorkoutHistory />
        <a href="/" className={styles.footer}>Home</a>
      </main>
    </div>
  );
}

export default WorkoutTracker;
