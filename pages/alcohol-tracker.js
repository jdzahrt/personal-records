import {useState, useEffect} from 'react'
import AlcoholForm from '../components/alcohol';
import styles from '../styles/Home.module.css';
import AlcoholHistory from '../components/alcohol-history';

export default function AlcoholTracker() {
    const [alcoholHistory, setAlcoholHistory] = useState([])

    useEffect(() => {
        fetch(`/api/alcohol-tracker/history`)
            .then(res => res.json())
            .then(records => {
                setAlcoholHistory(records);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>
                    Lets track how long you have gone without a drank!
                </h1>

                <div className={styles.grid}>
                    <AlcoholForm>

                    </AlcoholForm>
                </div>
                <AlcoholHistory history={alcoholHistory}/>
            </main>
        </div>
    )
}