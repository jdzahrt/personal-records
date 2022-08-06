import styles from '../styles/Home.module.css';
import History from '../components/history-tracker';
import {
  deleteAlcohol, getAlcoholHistory, addAlcohol, updateAlcohol,
} from '../service/alcohol';

function AlcoholTracker() {
  return (
    <div className={styles.container}>
      <main>
        <center><h1>Track how long you have gone without a drink!</h1></center>
        <History
          getHistory={getAlcoholHistory}
          addHistory={addAlcohol}
          deleteRecord={deleteAlcohol}
          updateRecord={updateAlcohol}
          type="Alcohol"
        />
        <a href="/" className={styles.footer}>Home</a>
      </main>
    </div>
  );
}

export default AlcoholTracker;
