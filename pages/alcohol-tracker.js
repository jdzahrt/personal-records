import AlcoholForm from '../components/alcohol';
import styles from '../styles/Home.module.css';

export default function Page() {
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
            </main>
        </div>
    )
}