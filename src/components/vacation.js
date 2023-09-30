import React from 'react';
import styles from '../../styles/Home.module.css';
import { calcDaysQuit } from '../../utils/days';

function Vacation() {
  return (
    <div>
      <h1 className={styles.title}>
        {calcDaysQuit(new Date().toISOString(), '6/12/2022')}
        {' '}
        days until vacation 🌴
      </h1>
    </div>
  );
}

export default Vacation;
