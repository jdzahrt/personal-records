import Head from 'next/head';
import Image from 'next/image';
import { Link } from '@nextui-org/react';
import styles from '../styles/Home.module.css';
import Header from '../components/header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Head>
        <title>Personal Records Tracker</title>
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

          {/* <a href="/workout-tracker" className={styles.card}> */}
          {/*   <h3>Workout Personal Records &rarr;</h3> */}
          {/*   <p>Take you to the page to track your personal workout records 💪</p> */}
          {/* </a> */}

          <a href="/fast-food-tracker" className={styles.card}>
            <h3>Fast Food Tracker &rarr;</h3>
            <p>Take you to the page to track your fast food habits 🍔</p>
          </a>

          <a href="/workouts-tracker" className={styles.card}>
            <h3>Workouts &rarr;</h3>
            <p>List all of your workouts in one location.</p>
          </a>

          <a href="/workout-tracker-v2" className={styles.card}>
            <h3>Exercises &rarr;</h3>
            <p>💪</p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
        >
          Powered by
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.logo}
            width={100}
            height={100}
          />
        </Link>
      </footer>
    </div>
  );
}
