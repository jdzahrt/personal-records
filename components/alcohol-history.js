import React, {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import {fetchApi} from "../utils/fetch-api";
import {calcDaysQuit} from "../utils/days";
import {getAlcoholHistory} from "../service/alcohol";

const defaultDate = new Date().toISOString().substring(0, 10);

const AlcoholHistory = () => {
    const [alcoholHistory, setAlcoholHistory] = useState([])
    const [quitDate, setQuitDate] = useState(defaultDate)
    const [isLoading, setIsLoading] = useState(true);
    const [maxDate, setMaxDate] = useState(0)

    // const fetchAlcoholHistory = async () => {
    //     const data = await fetchApi(`/api/alcohol-tracker/get-history`, 'GET');
    //     const results = await data.json();
    //     setIsLoading(false)
    //     setAlcoholHistory(results)
    //
    //     return results
    // }
    // getAlcoholHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await fetchApi('/api/alcohol-tracker/add', 'POST', {quitDate})
        // await fetchAlcoholHistory();
    }

    const handleStop = async (id) => {
        await fetchApi(`/api/alcohol-tracker/update?id=${id}`, 'PUT')
        // await fetchAlcoholHistory();
    }

    const handleDelete = async (id) => {
        await fetchApi(`/api/alcohol-tracker/delete?id=${id}`, 'DELETE')
        // await fetchAlcoholHistory();
    }

    const handleDateChange = (event) => {
        setQuitDate(event.target.value)
    }

    useEffect(() => {
        setIsLoading(true)
        getAlcoholHistory()
            .then((data) => {
                setAlcoholHistory(data)

                const holdDates = []

                data.forEach((v) => {
                    holdDates.push(calcDaysQuit(v.quitDate, v.endDate))
                })

                const mDate = Math.max(...holdDates);

                setMaxDate(mDate)
            });
        // getAlcoholHistory().then((data) => {
        //     const holdDates = []
        //
        //     data.forEach((v) => {
        //         holdDates.push(calcDaysQuit(v.quitDate, v.endDate))
        //     })
        //
        //     const mDate = Math.max(...holdDates);
        //
        //     setMaxDate(mDate)
        // }
        // );
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
            <center><h2>Alcohol History List</h2></center>
            {!isLoading ? alcoholHistory.map((record) => (
                    <ul key={record._id}>
                        <div>
                            Quit on {record.quitDate}
                            .... {calcDaysQuit(record.quitDate, record.endDate)} Days
                            Alcohol
                            FREE!
                            <span className={record.active ? styles.active : styles.inactive}>
                                {record.active ? ` 🍻ACTIVE🍻 ${maxDate - calcDaysQuit(record.quitDate, record.endDate)} more days to go to break your personal record!` :
                                    <p>INACTIVE - Streak ended on {record.endDate}</p>}
                            </span>
                        </div>
                        {record.active ?
                            <button className={styles.button} value={record._id} onClick={e => handleStop(e.target.value)}>
                                I DRANK...STOP TRACKING
                            </button> : <></>}
                        <button value={record._id} onClick={e => handleDelete(e.target.value)}>DELETE RECORD</button>
                    </ul>
                ))
                : <div>Loading....
                    <img src="/loading.svg" className={styles.loading} alt={"Loading image"}/>
                </div>}
        </div>
    );
};


export default AlcoholHistory