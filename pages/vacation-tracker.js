import styles from '../styles/Home.module.css';
import Vacation from '../components/vacation';

const VacationTracker = () => {
    return (
        <div className={styles.container}>
            <main>
                <Vacation/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}

export default VacationTracker