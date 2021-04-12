import React, {useEffect, useState} from 'react';
import moment from 'moment';
import styles from '../styles/Home.module.css';

const defaultDate = new Date().toISOString().substr(0, 10);

const AlcoholHistory = () => {
    const [alcoholHistory, setAlcoholHistory] = useState([])
    const [quitDate, setQuitDate] = useState([])

    const fetchAlcoholHistory = async () => {
        const data = await fetch(`/api/alcohol-tracker/get-history`);
        const results = await data.json();
        setAlcoholHistory(results)
    }

    useEffect(() => {
        fetchAlcoholHistory();
    }, [])

    const handleStop = (id) => {
        console.log(`Gonna update it to stop tracking ${id}`);
    }

    const handleDelete = async (id) => {
        await fetch(`/api/alcohol-tracker/delete?id=${id}`)
        await fetchAlcoholHistory();
    }

    const handleDateChange = (event) => {
        setQuitDate(event.target.value)
    }

    const calcDaysQuit = (quitDate) => {
        const date = new Date(quitDate)
        const currentDate = new Date()
        console.log('date', date);
        console.log('currentDate', currentDate);
        const timeDiff = currentDate.getTime() - date.getTime()
        console.log('timeDiff', timeDiff);
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        console.log('daysDiff', daysDiff);
        const daysDiffRounded = Math.round(daysDiff * 100) / 100
        console.log('daysDiffRounded', daysDiffRounded);
        return daysDiffRounded
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
            {alcoholHistory.map((record) => (
                <ul key={record._id}>
                    <p>
                        Quit on {moment(record.quitDate).format('MM-DD-YYYY')}
                        .... {calcDaysQuit(moment(record.quitDate))} Days
                        Alcohol
                        FREE! 🍻
                    </p>
                    <button value={record._id} onClick={e => handleStop(e.target.value)}>STOP TRACKING</button>
                    <button value={record._id} onClick={e => handleDelete(e.target.value)}>DELETE RECORD</button>
                </ul>
            ))}
        </div>
    );
};

export default AlcoholHistory