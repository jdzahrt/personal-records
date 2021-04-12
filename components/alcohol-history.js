import React, {useEffect, useState} from 'react';
import moment from 'moment';

const AlcoholHistory = () => {
    const [alcoholHistory, setAlcoholHistory] = useState([])

    const fetchAlcoholHistory = async () => {
        const data = await fetch(`/api/alcohol-tracker/get-history`);
        const results = await data.json();
        setAlcoholHistory(results)
    }

    useEffect(() => {
        console.log('alcoholHistory', alcoholHistory);
        fetchAlcoholHistory();
    }, [])

    const handleStop = (id) => {
        console.log(`Gonna update it to stop tracking ${id}`);
    }

    const handleDelete = async (id) => {
        await fetch(`/api/alcohol-tracker/delete?id=${id}`)
        await fetchAlcoholHistory();
    }

    const calcDaysQuit = (quitDate) => {
        const date = new Date(quitDate)
        const currentDate = new Date()
        const timeDiff = currentDate.getTime() - date.getTime()
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        const daysDiffRounded = Math.round(daysDiff * 100) / 100

        return daysDiffRounded
    }

    return (
        <div>
            <center><h1>Alcohol History List</h1></center>
            {alcoholHistory.map((record) => (
                <ul key={record._id}>
                    <p>
                        Quit on {moment(record.quitDate).format('MM-DD-YYYY')}.... {calcDaysQuit(record.quitDate)} Days Alcohol
                        FREE! 🍻
                    </p>
                    {/*<AlcoholClock quitDate={record.quitDate}/>*/}
                    <button value={record._id} onClick={e => handleStop(e.target.value)}>STOP TRACKING</button>
                    <button value={record._id} onClick={e => handleDelete(e.target.value)}>DELETE RECORD</button>
                </ul>
            ))}
        </div>
    );
};

export default AlcoholHistory