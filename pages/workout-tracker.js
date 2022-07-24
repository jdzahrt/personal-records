import styles from '../styles/Home.module.css';
import WorkoutHistory from '../components/workout-history';

const WorkoutTracker = () => {

    return (
        <div className={styles.container}>
            <main>
                <WorkoutHistory/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}

export default WorkoutTracker