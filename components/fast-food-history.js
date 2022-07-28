import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { calcDaysQuit } from '../utils/days';
import {
  addFastFood,
  deleteFastFood,
  getFastFoodHistory,
  updateFastFood,
} from '../services/fast-food';

const defaultDate = new Date().toISOString()
  .substring(0, 10);

function FastFoodHistory() {
  const [fastFoodHistory, setFastFoodHistory] = useState([]);
  const [quitDate, setQuitDate] = useState(defaultDate);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jsonData = await addFastFood({ quitDate });

    setFastFoodHistory((fastFoodHistory) => [jsonData, ...fastFoodHistory]);
  };

  const handleStop = async (id) => {
    const updatePayload = {
      active: false,
      endDate: new Date().toDateString(),
    };

    const jsonData = await updateFastFood(id, updatePayload);

    const newState = fastFoodHistory.map((obj) => {
      if (obj._id === id) {
        return { ...obj, ...jsonData };
      }
      return obj;
    });

    newState.sort((a, b) => b.active - a.active);

    setFastFoodHistory(newState);
  };

  const handleDelete = async (id) => {
    await deleteFastFood(id);

    // eslint-disable-next-line max-len
    setFastFoodHistory((fastFoodHistory) => fastFoodHistory.filter((fastFoodHistory) => fastFoodHistory._id !== id));
  };

  const handleDateChange = (event) => {
    setQuitDate(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    getFastFoodHistory()
      .then((data) => {
        setFastFoodHistory(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <label>
            Quit Date:
            <input type="date" defaultValue={defaultDate} onChange={handleDateChange} />
          </label>
          <br />
          <input type="submit" value="Save" />
        </div>
      </form>
      <center><h1>Fast Food History List</h1></center>
      {!isLoading ? fastFoodHistory.map((record) => (
        <ul key={record._id}>
          <div>
            Quit on
            {' '}
            {record.quitDate}
            ....
            {' '}
            {calcDaysQuit(record.quitDate, record.endDate)}
            {' '}
            Days
            Fast Food
            FREE! 🍻
            <span className={record.active ? styles.active : styles.inactive}>
              {record.active ? 'ACTIVE'
                : (
                  <p>
                    INACTIVE - Streak ended on
                    {record.endDate}
                  </p>
                )}
            </span>
          </div>
          {record.active
            ? (
              <button value={record._id} onClick={(e) => handleStop(e.target.value)}>
                I ATE FAST FOOD...STOP TRACKING
              </button>
            ) : <></>}
          <button value={record._id} onClick={(e) => handleDelete(e.target.value)}>
            DELETE RECORD
          </button>
        </ul>
      ))
        : (
          <div>
            Loading....
            <img src="/loading.svg" className={styles.loading} alt="Loading icon" />
          </div>
        )}
    </div>
  );
}

export default FastFoodHistory;
