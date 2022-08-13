import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Test from '../components/test';

function VacationTracker() {
  return (
    <div className={styles.container}>
      <main>
        <Test />
        <div className={styles.footer}>
          <Link href="/" className={styles.footer}>Home</Link>
        </div>
      </main>
    </div>
  );
}

export default VacationTracker;
