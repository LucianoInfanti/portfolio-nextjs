import Header from "../components/Header/Header";
import Social from "../components/Social/Social";

import styles from "./fullwork.module.css";

import Head from "next/head";

export default function Fullwork() {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>
      <Header />
      <Social />
      Full work
    </>
  );
}
