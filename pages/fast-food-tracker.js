import styles from '../styles/Home.module.css';
import FastFoodHistory from '../components/fast-food-history';

const FastFoodTracker = () => {
    return (
        <div className={styles.container}>
            <main>
                <h1 className={styles.title}>
                    Track how long you have gone without eating fast food! 🍔
                </h1>
                <FastFoodHistory/>
                <a href={'/'} className={styles.footer}>Home</a>
            </main>
        </div>
    )
}

export default FastFoodTracker