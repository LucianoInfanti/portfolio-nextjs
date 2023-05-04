import { useRouter } from "next/router";
import Header from "../components/home/Header/Header";
import Social from "../components/Social/Social";

import styles from "./work.module.css";

const Password = () => {
  const router = useRouter();
  const error = router.query.error;

  return (
    <div>
      <Header />
      <Social/>

      <div className={styles.workWrapper}>
        <div className={styles.work}>
          {/* <h1>Access denied</h1> */}
          <form
            className={styles.form}
            action="/api/password-protected"
            method="post"
          >
            <input
              autoFocus
              className={styles.input}
              type="text"
              name="password"
              placeholder="Enter password"
            />
            <button className={styles.btn}>Submit</button>
            {error && <span className={styles.error}>{error}</span>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
