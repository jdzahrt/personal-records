import { Link } from '@nextui-org/react';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import WorkoutHistoryV2 from '../components/workout-history-v2';

function WorkoutTrackerV2() {
  return (
    <div className={styles.container}>
      <main>
        <title>Exercise Tracker</title>
        <center><h1>Exercise Tracker! 💪</h1></center>
        <WorkoutHistoryV2 />
        <div className={styles.footer}>
          <Link block color="primary" href="/">
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default WorkoutTrackerV2;
