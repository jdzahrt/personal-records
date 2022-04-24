import React, {useEffect, useState} from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const defaultDate = new Date().toISOString().substr(0, 10);

const Vacation = () => {
    const calcDaysQuit = (quitDate, endDate) => {
        quitDate = moment(quitDate)
        endDate = endDate ? moment(endDate) : null;
        const currentDate = moment()

        return endDate ? endDate.diff(quitDate, 'days') : currentDate.diff(quitDate, 'days');
    }

    return (
        <div>
        <h1 className={styles.title}>
            {calcDaysQuit(new Date().toISOString(), '6/12/2022')} days til' vacation
        </h1>
        </div>
    );
};


export default Vacation