import Header from "../components/home/Header/Header";
import Social from "../components/Social/Social";
import styles from "./index.module.css";
import Head from "next/head";
import AnimatedTextWord from "./AnimatedTextWords";
import { AnimatePresence } from "framer-motion";


export default function Home() {
  return (
    <div className={styles.x}>
      <Head>
        <title>Luciano Infanti</title>
      </Head>


      <div className={styles.introduction}>
      <AnimatePresence exitBeforeEnter>
        <AnimatedTextWord text="Designer and code"/>
        <AnimatedTextWord text=" enthusiast at Work & Co"/>
      </AnimatePresence>
        {/* <p>
          Designer and code enthusiast at{" "}
          <a href="https://work.co/" target="blank">
            Work & Co
          </a>
        </p> */}
      </div>
    </div>
  );
}