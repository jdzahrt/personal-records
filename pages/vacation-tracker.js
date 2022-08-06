import Link from 'next/link';
import styles from '../styles/Home.module.css';
import History from '../components/history-tracker';
import {
  addFastFood,
  getFastFoodHistory,
  deleteFastFood,
  updateFastFood,
} from '../service/fast-food';

function VacationTracker() {
  return (
    <div className={styles.container}>
      <main>
        {/* <Vacation /> */}
        <History
          getHistory={getFastFoodHistory}
          addHistory={addFastFood}
          deleteRecord={deleteFastFood}
          updateRecord={updateFastFood}
          name="Fast Food History List"
        />
        <Link href="/" className={styles.footer}>Home</Link>
      </main>
    </div>
  );
}

export default VacationTracker;
