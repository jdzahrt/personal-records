import {useState, useEffect, useRef} from 'react'
import AlcoholForm from '../components/alcohol';
import styles from '../styles/Home.module.css';
import AlcoholHistory from '../components/alcohol-history';

export default function AlcoholTracker() {
    // const [alcoholHistory, setAlcoholHistory] = useState([])

    // console.log('here');
    // useEffect(() => {
    //     fetch(`/api/alcohol-tracker/history`)
    //         .then(res => res.json())
    //         .then(records => {
    //             setAlcoholHistory(records);
    //         })
    //         .catch(error => console.log(error));
    // }, []);
    // const fetchAlcoholHistory = async () => {
    //     const data = await fetch(`/api/alcohol-tracker/history`);
    //     const results = await data.json();
    //     setAlcoholHistory(results)
    // }
    //
    // useEffect(() => {
    //     console.log('alcoholHistory', alcoholHistory);
    //     fetchAlcoholHistory();
    // }, [])
    
    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>
                    Lets track how long you have gone without a drank!
                </h1>

                <div className={styles.grid}>
                    <AlcoholForm/>
                </div>
                <AlcoholHistory/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}