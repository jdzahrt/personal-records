import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from '../styles/Home.module.css';
import { calcDaysQuit } from '../utils/days';

function History(props) {
  History.propTypes = {
    type: PropTypes.string.isRequired,
    getHistory: PropTypes.func.isRequired,
    addHistory: PropTypes.func.isRequired,
    deleteRecord: PropTypes.func.isRequired,
    updateRecord: PropTypes.func.isRequired,
  };

  const {
    type,
    getHistory,
    addHistory,
    deleteRecord,
    updateRecord,
  } = props;

  const defaultDate = new Date().toISOString()
    .substring(0, 10);

  const [historyList, setHistory] = useState([]);
  const [quitDate, setQuitDate] = useState(defaultDate);
  const [isLoading, setIsLoading] = useState(true);
  const [maxDate, setMaxDate] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jsonData = await addHistory({ quitDate });

    setHistory((h) => [jsonData, ...h]);
  };

  const handleDelete = async (id) => {
    await deleteRecord(id);

    setHistory((ah) => ah.filter((a) => a.id !== id));
  };

  const handleDateChange = (event) => {
    setQuitDate(event.target.value);
  };

  const handleStop = async (id) => {
    const updatePayload = {
      active: false,
      endDate: new Date().toDateString(),
    };

    const jsonData = await updateRecord(id, updatePayload);

    const newState = historyList.map((obj) => {
      if (obj.id === id) {
        return { ...obj, ...jsonData };
      }
      return obj;
    });

    newState.sort((a, b) => b.active - a.active);

    setHistory(newState);
  };

  useEffect(() => {
    setIsLoading(true);
    getHistory()
      .then((data) => {
        setHistory(data);

        const holdDates = [];
        data.forEach((v) => {
          holdDates.push(calcDaysQuit(v.quitDate, v.endDate));
        });

        const mDate = Math.max(...holdDates);
        setMaxDate(mDate);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <label htmlFor="date-input">
            Quit Date:
            {' '}
            <input
              type="date"
              id="date-input"
              defaultValue={defaultDate}
              onChange={handleDateChange}
            />
          </label>
          <br />
          <input className={styles.button} type="submit" value="Save" />
        </div>
      </form>
      <center><h2>{`${type} List`}</h2></center>
      {!isLoading ? historyList.map((record) => (
        <ul key={record.id}>
          <div>
            Quit on
            {' '}
            {' '}
            {record.quitDate}
            ....
            {' '}
            {calcDaysQuit(record.quitDate, record.endDate)}
            {' '}
            Days
            {` ${type} `}
            FREE!
            <span className={record.active ? styles.active : styles.inactive}>
              {record.active ? (
                <p>
                  ACTIVE -
                  {' '}
                  {maxDate - calcDaysQuit(record.quitDate, record.endDate)}
                  {' '}
                  more days to go to break your personal record!
                  {' '}
                </p>
              )
                : (
                  <p>
                    INACTIVE - Streak ended on
                    {' '}
                    {record.endDate}
                  </p>
                )}
            </span>
          </div>
          {record.active
            ? (
              <button
                type="button"
                className={styles.button}
                value={record.id}
                onClick={(e) => handleStop(e.target.value)}
              >
                I DRANK...STOP TRACKING
              </button>
            ) : <> </>}
          <button
            type="button"
            value={record.id}
            onClick={(e) => handleDelete(e.target.value)}
          >
            DELETE RECORD
          </button>
        </ul>
      ))
        : (
          <div>
            Loading....
            <Image
              src="/loading.svg"
              alt="Loading image"
              className={styles.loading}
              width={25}
              height={25}
            />
          </div>
        )}
    </div>
  );
}

export default History;
