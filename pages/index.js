import styles from "./index.module.css";
import Head from "next/head";
import AnimatedTextWord from "./AnimatedTextWords";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className={styles.x}>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <div className={styles.introduction}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Designer and code enthusiast at{" "}
          <a href="https://work.co/" target="blank">
            Work & Co
          </a>
        </motion.p>
      </div>
    </div>
  );
}
