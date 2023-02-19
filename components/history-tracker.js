import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Input, Loading, Text,
} from '@nextui-org/react';
import styles from '../styles/Home.module.css';
import { calcDaysQuit } from '../utils/days';
import { DeleteIcon } from './Buttons/DeleteIcon';

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
  const [activeRecord, setActiveRecord] = useState(false);

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

  const dateTil = (days) => {
    const d = new Date();
    const rez = d.setDate(d.getDate() + days);
    return new Date(rez).toLocaleDateString();
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

        const activeRec = data.find((e) => e.active === true);
        setActiveRecord(activeRec);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {!activeRecord && !isLoading ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <label htmlFor="date-input">
              Quit Date:
              {' '}
              <Input
                type="date"
                id="date-input"
                initialValue={defaultDate}
                onChange={handleDateChange}
              />
            </label>
            <br />
            <div align="center" className={styles.button}>
              <Button color="gradient" type="submit">Start Tracking</Button>
            </div>
          </div>
        </form>
      ) : (<br />)}
      <center><h2>{`${type} List`}</h2></center>
      <div className={styles.card}>
        {!isLoading ? historyList.map((record) => (
          <ul key={record.id}>
            <div>
              <span className={record.active ? styles.active : styles.inactive}>
                {record.active ? (
                  <div className={styles.card}>
                    <Text weight="bold">
                      {`Quit on ${record.quitDate} - ${calcDaysQuit(record.quitDate, record.endDate)} Days ${type} FREE!`}
                    </Text>
                    <Text color="success" weight="bold">
                      {`ACTIVE - In ${maxDate - calcDaysQuit(record.quitDate, record.endDate)} 
                  more days you will break your personal record on ${dateTil(maxDate - calcDaysQuit(record.quitDate, record.endDate))}!`}
                    </Text>
                    <div align="center">
                      <Button
                        color="warning"
                        value={record.id}
                        onClick={(e) => handleStop(e.target.value)}
                      >
                        STOP TRACKING
                      </Button>
                    </div>
                  </div>
                )
                  : (
                    <div>
                      <Text
                        weight="bold"
                      >
                        {`Quit on ${record.quitDate} - ${calcDaysQuit(record.quitDate, record.endDate)} Days ${type} FREE!`}
                      </Text>
                      <Text
                        color="error"
                      >
                        {`INACTIVE - Streak ended on ${record.endDate}`}
                      </Text>
                    </div>
                  )}
              </span>
            </div>
            {record.active
              ? (
                <b />
              ) : (
                <div align="center" className={styles.button}>
                  <Button
                    color="error"
                    value={record.id}
                    onPress={(e) => handleDelete(e.target.value)}
                  >
                    DELETE RECORD
                  </Button>
                </div>
              )}

          </ul>
        ))
          : (
            <div>
              <Loading>Loading Stuff</Loading>
            </div>
          )}
      </div>
    </div>
  );
}

export default History;
