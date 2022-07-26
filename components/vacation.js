import React from 'react';
import styles from '../styles/Home.module.css';
import {calcDaysQuit} from "../utils/days";

const Vacation = () => {
    return (
        <div>
        <h1 className={styles.title}>
            {calcDaysQuit(new Date().toISOString(), '6/12/2022')} days til' vacation 🌴
        </h1>
        </div>
    );
};


export default Vacation