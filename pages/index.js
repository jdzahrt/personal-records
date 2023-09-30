import Head from 'next/head';
import Image from 'next/image';
import { Link } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
import Header from '../src/components/header';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Records Tracker</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Personal Records Tracker!
        </h1>
        {session ? (
          <div className={styles.grid}>
            <a href="/alcohol-tracker" className={styles.card}>
              <h3>Alcohol Tracker &rarr;</h3>
              <p>Take you to the page to track your drinks 🍻</p>
            </a>

            <a href="/fast-food-tracker" className={styles.card}>
              <h3>Fast Food Tracker &rarr;</h3>
              <p>Take you to the page to track your fast food habits 🍔</p>
            </a>

            <a href="/workouts-tracker" className={styles.card}>
              <h3>Workouts &rarr;</h3>
              <p>All of your workouts in one location 🏋️</p>
            </a>

            <a href="/exercise-tracker" className={styles.card}>
              <h3>Exercises  &rarr;</h3>
              <p>All exercises listed in one location 💪</p>
            </a>
          </div>
        ) : <h2>Please sign in to start tracking your personal records!</h2>}
        <Header />
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
