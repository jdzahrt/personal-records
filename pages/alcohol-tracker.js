import styles from '../styles/Home.module.css';
import AlcoholHistory from '../components/alcohol-history';

const AlcoholTracker = () => {
    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>
                    Track how long you have gone without a drank!
                </h1>
                <AlcoholHistory/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}

export default AlcoholTracker