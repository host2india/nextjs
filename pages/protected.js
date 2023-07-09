import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Protected.module.css";

export default function Protected() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  const goHome = () => {
    router.push("/");
  };

  return (
    <div>
      <h1 className={styles.title}>Protected Content</h1>
      {session ? (
        <>
          <p>
            Congratulations, {session.user.name}, you are successfully logged in!
          </p>
          <button className={`${styles.button} ${styles.blueButton}`} onClick={() => signOut()}>
            Sign Out
          </button>
          <button className={`${styles.button} ${styles.orangeButton}`} onClick={goHome}>
            Go Home
          </button>
        </>
      ) : (
        <>
          <p>Please log in to view.</p>
          <button className={`${styles.button} ${styles.blueButton}`} onClick={() => signIn()}>
            Sign in
          </button>
          <button className={`${styles.button} ${styles.orangeButton}`} onClick={goHome}>
            Go Home
          </button>
        </>
      )}
    </div>
  );
}
