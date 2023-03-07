import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import AccessDenied from '../components/access-denied';
import Workouts from '../components/workouts';

function WorkoutsTracker() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className={styles.container}>
        <AccessDenied />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main>
        <title>Workouts Tracker</title>
        <center><h1>Workouts 🏋️</h1></center>
        <Workouts />
        <div className={styles.footer}>
          <Link href="/" className={styles.footer}>Home</Link>
        </div>
      </main>
    </div>
  );
}

export default WorkoutsTracker;
