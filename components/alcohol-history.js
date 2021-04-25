import React, {useEffect, useState} from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const defaultDate = new Date().toISOString().substr(0, 10);

const AlcoholHistory = () => {
    const [alcoholHistory, setAlcoholHistory] = useState([])
    const [quitDate, setQuitDate] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const fetchAlcoholHistory = async () => {
        const data = await fetch(`/api/alcohol-tracker/get-history`);
        const results = await data.json();
        setIsLoading(false)
        setAlcoholHistory(results)
    }

    const handleStop = async (id) => {
        await fetch(`/api/alcohol-tracker/update?id=${id}`,
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

        await fetchAlcoholHistory();
    }

    const handleDelete = async (id) => {
        await fetch(`/api/alcohol-tracker/delete?id=${id}`)
        await fetchAlcoholHistory();
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

        await fetch('/api/alcohol-tracker/add',
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

        await fetchAlcoholHistory();
    }

    useEffect(() => {
        fetchAlcoholHistory();
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
            <center><h1>Alcohol History List</h1></center>
            {!isLoading ? alcoholHistory.map((record) => (
                    <ul key={record._id}>
                        <div>
                            Quit on {moment(record.quitDate).format('MM-DD-YYYY')}
                            .... {calcDaysQuit(moment(record.quitDate), record.endDate)} Days
                            Alcohol
                            FREE! 🍻
                            <span className={record.active ? styles.active : styles.inactive}>
                                {record.active ? 'ACTIVE' : <p>INACTIVE - Streak ended on {record.endDate}</p>}
                            </span>
                        </div>
                        {record.active ?
                            <button value={record._id} onClick={e => handleStop(e.target.value)}>
                                I DRANK...STOP TRACKING
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


export default AlcoholHistory