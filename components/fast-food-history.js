import React, {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import {fetchApi} from "../utils/fetch-api";
import {calcDaysQuit} from "../utils/days";

const defaultDate = new Date().toISOString().substring(0, 10);

const FastFoodHistory = () => {
    const [fastFoodHistory, setFastFoodHistory] = useState([])
    const [quitDate, setQuitDate] = useState(defaultDate)
    const [isLoading, setIsLoading] = useState(true);

    const fetchFastFoodHistory = async () => {
        const data = await fetchApi(`/api/fast-food-tracker/get-history`, 'GET');
        const results = await data.json();
        setIsLoading(false)
        setFastFoodHistory(results)
    }

    const handleStop = async (id) => {
        await fetchApi(`/api/fast-food-tracker/update?id=${id}`, 'PUT')
        await fetchFastFoodHistory();
    }

    const handleDelete = async (id) => {
        await fetchApi(`/api/fast-food-tracker/delete?id=${id}`, 'DELETE')
        await fetchFastFoodHistory();
    }

    const handleDateChange = (event) => {
        setQuitDate(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetchApi('/api/fast-food-tracker/add', 'POST', {quitDate})
        await fetchFastFoodHistory();
    }

    useEffect(() => {
        fetchFastFoodHistory();
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={styles.card}>
                    <label>
                        Quit Date:
                        <input type="date" defaultValue={defaultDate} onChange={handleDateChange}/>
                    </label>
                    <br/>
                    <input type="submit" value="Save"/>
                </div>
            </form>
            <center><h1>Fast Food History List</h1></center>
            {!isLoading ? fastFoodHistory.map((record) => (
                    <ul key={record._id}>
                        <div>
                            Quit on {record.quitDate}
                            .... {calcDaysQuit(record.quitDate, record.endDate)} Days
                            Fast Food
                            FREE! 🍻
                            <span className={record.active ? styles.active : styles.inactive}>
                                {record.active ? 'ACTIVE' : <p>INACTIVE - Streak ended on {record.endDate}</p>}
                            </span>
                        </div>
                        {record.active ?
                            <button value={record._id} onClick={e => handleStop(e.target.value)}>
                                I ATE FAST FOOD...STOP TRACKING
                            </button> : <></>}
                        <button value={record._id} onClick={e => handleDelete(e.target.value)}>DELETE RECORD</button>
                    </ul>
                ))
                : <div>Loading....
                    <img src="/loading.svg" className={styles.loading} alt={"Loading icon"}/>
                </div>}
        </div>
    );
};


export default FastFoodHistory