import Link from 'next/link';
import styles from '../styles/Home.module.css';
import History from '../components/history-tracker';
import {
  addFastFood,
  deleteFastFood,
  getFastFoodHistory,
  updateFastFood,
} from '../services/fast-food';

function FastFoodTracker() {
  return (
    <div className={styles.container}>
      <main>
        <center><h1>Track how long you have gone without eating fast food! 🍔</h1></center>
        <History
          getHistory={getFastFoodHistory}
          addHistory={addFastFood}
          deleteRecord={deleteFastFood}
          updateRecord={updateFastFood}
          type="Fast Food"
        />
        <div className={styles.footer}>
          <Link href="/">Home</Link>
        </div>
      </main>
    </div>
  );
}

export default FastFoodTracker;
