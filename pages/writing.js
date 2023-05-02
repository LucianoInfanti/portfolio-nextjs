import Header from "../components/home/Header/Header";
import Social from "../components/social/Social";
import styles from "./index.module.css";
import Head from "next/head";

import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

import { motion } from "framer-motion";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <Header />
      <Social/>

      <div className={styles.wrapper}>
        <div className={styles.articleWrapper}>
          {articles.map((article) => (
            <li key={article.id} className={styles.articleItem}>
              <Link href={`/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
        </div>
      </div>

      <motion.nav className={styles.nav}>
        <br /> Designer and code enthusiast based in São Paulo, Brazil @
        <a href="https://work.co/" className={styles.italic}>
          Work & Co
        </a>
        .
      </motion.nav>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Articles {
        articles {
          id
          date
          slug
          title
        }
      }
    `,
  });

  const { articles } = data;
  return {
    props: {
      articles,
    },
  };
}
