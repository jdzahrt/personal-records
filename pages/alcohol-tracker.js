import styles from '../styles/Home.module.css';
import AlcoholHistory from '../components/alcohol-history';

const AlcoholTracker = () => {
    return (
        <div className={styles.container}>
            <main>
                <center><h1>Track how long you have gone without a drink!</h1></center>
                <AlcoholHistory/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}

export default AlcoholTracker