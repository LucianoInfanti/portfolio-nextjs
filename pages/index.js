import Head from "next/head";
import Header from "../components/home/Header";
import { motion } from "framer-motion";
import styles from "./index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>
      <Header />

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className={styles.wrapper}
      >
        <h1 className={styles.text}>
          Designer and code enthuasiast based in São Paulo, Brazil currently at{" "}
          <a href="https://work.co/" className={styles.italic}>
            Work & Co
          </a>
        </h1>
        <div className={styles.social}>
          <a
            target="blank"
            href="https://www.linkedin.com/in/luciano-infanti/"
            className="motionHover"
          >
            LinkedIn
          </a>
          <span className="separator">,</span>
          <a
            target="blank"
            href="https://github.com/LucianoInfanti"
            className="motionHover"
          >
            GitHub
          </a>
          <span className="separator">,</span>
          <a
            target="blank"
            href="https://savee.it/lucianoinfanti/"
            className="motionHover"
          >
            Savee
          </a>
        </div>
      </motion.section>

      <div className={styles.a}>
        <img src="/images/img.png" />
      </div>
    </>
  );
}
