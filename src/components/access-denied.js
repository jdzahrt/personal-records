import { signIn } from 'next-auth/react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </a>
      </p>
      <div className={styles.footer}>
        <Link href="/" className={styles.footer}>Home</Link>
      </div>
    </>
  );
}
