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

      <div className={styles.bodyWrapper}>
        <div className={styles.contentWrapper}>
          <span className={styles.overline}>Luciano Infanti</span>
          <p>
            Designer and code enthusiast slowly <br></br>struggling to learn
            code. Currently at{" "}
            <a href="https://work.co/" target="blank" className="underlineLink">
              {" "}
              Work & Co
            </a>
          </p>
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.overline}>Hailing frequencies open</span>
          <div className={styles.social}>
            <a
              target="blank"
              href="https://www.linkedin.com/in/luciano-infanti/"
            >
              LinkedIn
            </a>
            <span className={styles.span}>, </span>
            <a target="blank" href="https://github.com/LucianoInfanti">
              GitHub
            </a>
            <span className={styles.span}>, </span>
            <a target="blank" href="https://savee.it/lucianoinfanti/">
              Savee
            </a>
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <span className={styles.overline}>Writing</span>
          <div className={styles.articleWrapper}>
            {articles.map((article, index) => (
              <li key={article.id} className={styles.articleItem}>
                <div className={styles.articleRow}>
                  <Link href={`/${article.slug}`}>{article.title}</Link>
                  <div className={styles.divider}></div>
                  <p>{article.date.substring(6).replace(/-/g, ".")}</p>
                </div>
              </li>
            ))}
          </div>
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
