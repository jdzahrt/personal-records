import { Link } from '@nextui-org/react';
import styles from '../styles/Home.module.css';
import ExerciseList from '../src/components/exercise-list';

function ExerciseTracker() {
  return (
    <div className={styles.container}>
      <main>
        <title>Exercise Tracker</title>
        <center><h1>Exercise Tracker! 💪</h1></center>
        <ExerciseList />
        <div className={styles.footer}>
          <Link block color="primary" href="/">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default ExerciseTracker;
