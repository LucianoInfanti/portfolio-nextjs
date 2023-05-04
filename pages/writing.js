import Header from "../components/home/Header/Header";
import Social from "../components/social/Social";
import styles from "./writing.module.css";
import { motion } from "framer-motion";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <Header />
      <Social />

      <div className={styles.wrapper}>
        <h1 className={styles.writingTitle}>Random pieces on design, coding and whatever comes to mind</h1>
        <div className={styles.articleWrapper}>
          {articles.map((article, index) => (
            <li key={article.id} className={styles.articleItem}>
              {/* <div className={styles.articleNumber}>{`0${index + 1}`}</div> */}
 
              <Link href={`/${article.slug}`}>{article.title}</Link>
            </li>
          ))}
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
