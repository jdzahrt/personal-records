import React, {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';
import {calcDaysQuit} from "../utils/days";
import {addAlcohol, deleteAlcohol, getAlcoholHistory, updateAlcohol} from "../service/alcohol";

const defaultDate = new Date().toISOString().substring(0, 10);

const AlcoholHistory = () => {
    const [alcoholHistory, setAlcoholHistory] = useState([])
    const [quitDate, setQuitDate] = useState(defaultDate)
    const [isLoading, setIsLoading] = useState(true);
    const [maxDate, setMaxDate] = useState(0)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const jsonData = await addAlcohol({quitDate})

        setAlcoholHistory(alcoholHistory => [jsonData, ...alcoholHistory])
    }

    const handleStop = async (id) => {
        const updatePayload = {
            active: false,
            endDate: new Date().toDateString()
        }

        const jsonData = await updateAlcohol(id, updatePayload)

        const newState = alcoholHistory.map(obj => {
            if (obj._id === id) {
                return {...obj, ...jsonData}
            }
            return obj
        })

        newState.sort((a, b) => {
            return b.active - a.active
        })

        setAlcoholHistory(newState)
    }

    const handleDelete = async (id) => {
        await deleteAlcohol(id)

        setAlcoholHistory(alcoholHistory => alcoholHistory.filter(alcoholHistory => alcoholHistory._id !== id))
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
            })
            .finally(() => setIsLoading(false));
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
