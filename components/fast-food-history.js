import React, {useEffect, useState} from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const defaultDate = new Date().toISOString().substr(0, 10);

const FastFoodHistory = () => {
    const [fastFoodHistory, setFastFoodHistory] = useState([])
    const [quitDate, setQuitDate] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchFastFoodHistory = async () => {
        const data = await fetch(`/api/fast-food-tracker/get-history`);
        const results = await data.json();
        setIsLoading(false)
        setFastFoodHistory(results)
    }

    const handleStop = async (id) => {
        await fetch(`/api/fast-food-tracker/update?id=${id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'applicaiton/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(response => console.log('Success', response))

        await fetchFastFoodHistory();
    }

    const handleDelete = async (id) => {
        await fetch(`/api/fast-food-tracker/delete?id=${id}`)
        await fetchFastFoodHistory();
    }

    const handleDateChange = (event) => {
        setQuitDate(event.target.value)
    }

    const calcDaysQuit = (quitDate, endDate) => {
        quitDate = moment(quitDate)
        endDate = endDate ? moment(endDate) : null;
        const currentDate = moment()

        return endDate ? endDate.diff(quitDate, 'days') : currentDate.diff(quitDate, 'days');
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await fetch('/api/fast-food-tracker/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'applicaiton/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quitDate
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(response => console.log('Success', response))

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
                            Quit on {moment(record.quitDate).format('MM-DD-YYYY')}
                            .... {calcDaysQuit(moment(record.quitDate), record.endDate)} Days
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
                    <img src="/loading.svg" className={styles.loading}/>
                </div>}
        </div>
    );
};


export default FastFoodHistory