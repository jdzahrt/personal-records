import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import Vacation from '../src/components/vacation';
import AccessDenied from '../src/components/access-denied';

function VacationTracker() {
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
        <title>Vacation Tracker</title>
        <Vacation />
        <div className={styles.footer}>
          <Link href="/" className={styles.footer}>Home</Link>
        </div>
      </main>
    </div>
  );
}

export default VacationTracker;
