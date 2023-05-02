import styles from "./social.module.css";

function Social() {
  return (
    <>
      <div className={styles.social}>
        <a
          target="blank"
          href="https://www.linkedin.com/in/luciano-infanti/"
        >
          LinkedIn
        </a>
        <span className={styles.span}>, </span>
        <a
          target="blank"
          href="https://github.com/LucianoInfanti"
        >
          GitHub
        </a>
        <span className={styles.span}>, </span>
        <a
          target="blank"
          href="https://savee.it/lucianoinfanti/"
        >
          Savee
        </a>
      </div>
    </>
  );
}

export default Social;
