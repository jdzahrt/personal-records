import Link from 'next/link';
import styles from '../styles/Home.module.css';
import TableTest from '../components/table-test';

function TableTracker() {
  return (
    <div className={styles.container}>
      <main>
        <title>Table Tracker</title>
        <TableTest />
        <div className={styles.footer}>
          <Link href="/" className={styles.footer}>Home</Link>
        </div>
      </main>
    </div>
  );
}

export default TableTracker;
