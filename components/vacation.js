import React from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const Vacation = () => {
    const calcDaysDiff = (quitDate, endDate) => {
        quitDate = moment(quitDate)
        endDate = endDate ? moment(endDate) : null;
        const currentDate = moment()

        return endDate ? endDate.diff(quitDate, 'days') : currentDate.diff(quitDate, 'days');
    }

    return (
        <div>
        <h1 className={styles.title}>
            {calcDaysDiff(new Date().toISOString(), '6/12/2022')} days til' vacation 🌴
        </h1>
        </div>
    );
};


export default Vacation