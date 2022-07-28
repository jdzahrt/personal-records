import Link from 'next/link';
import styles from '../styles/Home.module.css';
import Vacation from '../components/vacation';

function VacationTracker() {
  return (
    <div className={styles.container}>
      <main>
        <Vacation />
        <Link href="/" className={styles.footer}>Home</Link>
      </main>
    </div>
  );
}

export default VacationTracker;
