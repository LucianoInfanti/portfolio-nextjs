import Header from "../components/home/Header/Header";
import Social from "components/Social/Social.js";
import styles from "./writing.module.css";
import { motion } from "framer-motion";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import AnimatedTextWord from "./AnimatedTextWords";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>


      <div className={styles.wrapper}>
        <div className={styles.pageTitle}>
          <AnimatedTextWord text="Random pieces on design, coding " />
          <AnimatedTextWord text="and whatever comes to mind" />
        </div>
        <div className={styles.articleWrapper}>
          {articles.map((article, index) => (
            <li key={article.id} className={styles.articleItem}>
              {/* <div className={styles.articleNumber}>{`0${index + 1}`}</div> */}
              <a href={`/${article.slug}`}>
                <AnimatedTextWord text={article.title} />
              </a>
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
