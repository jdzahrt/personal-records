import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/header';

export default function Home() {
    return (
        <div className={styles.container}>
            <Header/>
            <Head>
                <title>Personal Records Tracker</title>
                {/*<link rel="icon" href="/favicon.ico"/>*/}
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to Personal Records Tracker!
                </h1>

                <div className={styles.grid}>
                    <a href="/alcohol-tracker" className={styles.card}>
                        <h3>Alcohol Tracker &rarr;</h3>
                        <p>Take you to the page to track your drinks 🍻</p>
                    </a>

                    <a href="/workout-tracker" className={styles.card}>
                        <h3>Workout Tracker &rarr;</h3>
                        <p>Take you to the page to track your personal workout records</p>
                    </a>

                    {/*<a*/}
                    {/*    href="https://github.com/vercel/next.js/tree/master/examples"*/}
                    {/*    className={styles.card}*/}
                    {/*>*/}
                    {/*    <h3>Examples &rarr;</h3>*/}
                    {/*    <p>Discover and deploy boilerplate example Next.js projects.</p>*/}
                    {/*</a>*/}

                    {/*<a*/}
                    {/*    href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
                    {/*    className={styles.card}*/}
                    {/*>*/}
                    {/*    <h3>Deploy &rarr;</h3>*/}
                    {/*    <p>*/}
                    {/*        Instantly deploy your Next.js site to a public URL with Vercel.*/}
                    {/*    </p>*/}
                    {/*</a>*/}
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo}/>
                </a>
            </footer>
        </div>
    )
}
