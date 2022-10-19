import Header from "../components/home/Header";
import styles from "./index.module.css";
import Head from "next/head";

import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>
      <Header />

      <div className={styles.social}>
        <a
          className={styles.socialItem}
          target="blank"
          href="https://www.linkedin.com/in/luciano-infanti/"
        >
          LinkedIn
        </a>
        <span className={styles.span}>, </span>
        <a
          className={styles.socialItem}
          target="blank"
          href="https://github.com/LucianoInfanti"
        >
          GitHub
        </a>
        <span className={styles.span}>, </span>
        <a
          className={styles.socialItem}
          target="blank"
          href="https://savee.it/lucianoinfanti/"
        >
          Savee
        </a>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.articleWrapper}>
          {articles.map((article) => (
            <li key={article.id} className={styles.articleItem}>
              <Link href={`/${article.slug}`}>{article.title}</Link>
              {/* <span className={styles.date}>{article.date}</span> */}
            </li>
          ))}
          {/* {articles.length > 3 && <div className={styles.spacer}></div>} */}
        </div>
      </div>
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
