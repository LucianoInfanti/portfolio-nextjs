import Header from "../components/home/Header/Header";
import Social from "../components/Social/Social";

import styles from "./index.module.css";

import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <Header />
      <Social />

      <div className={styles.introduction}>
        <p>
          Designer and code enthusiast based in São Paulo, Brazil @{" "}
          <a href="https://work.co/" target="blank">
            Work & Co.
          </a>
        </p>
      </div>
    </>
  );
}
