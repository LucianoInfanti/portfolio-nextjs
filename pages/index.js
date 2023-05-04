import Header from "../components/home/Header/Header";
import Social from "../components/Social/Social";
import styles from "./index.module.css";
import Head from "next/head";
import AnimatedTextWord from "./AnimatedTextWords";


export default function Home() {
  return (
    <div className={styles.x}>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <Header />
      <Social />

      <div className={styles.introduction}>
      {/* <AnimatedTextWord text={"Designer and code enthusiast at Work & Co"}/> */}
        <p>
          Designer and code enthusiast at{" "}
          <a href="https://work.co/" target="blank">
            Work & Co
          </a>
        </p>
      </div>
    </div>
  );
}