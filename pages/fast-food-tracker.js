import styles from '../styles/Home.module.css';
import History from '../components/history-tracker';
import {
  addFastFood,
  deleteFastFood,
  getFastFoodHistory,
  updateFastFood,
} from '../service/fast-food';

function FastFoodTracker() {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>
          Track how long you have gone without eating fast food! 🍔
        </h1>
        <History
          getHistory={getFastFoodHistory}
          addHistory={addFastFood}
          deleteRecord={deleteFastFood}
          updateRecord={updateFastFood}
          type="Fast Food"
        />
        <a href="/" className={styles.footer}>Home</a>
      </main>
    </div>
  );
}

export default FastFoodTracker;
