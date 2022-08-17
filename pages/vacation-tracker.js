import Link from 'next/link';
import { useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import Vacation from '../components/vacation';
import AccessDenied from '../components/access-denied';

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
        <Vacation />
        <div className={styles.footer}>
          <Link href="/" className={styles.footer}>Home</Link>
        </div>
      </main>
    </div>
  );
}

export default VacationTracker;
