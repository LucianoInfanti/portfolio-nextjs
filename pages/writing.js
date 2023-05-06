import styles from "./writing.module.css";
import client from "../apolloClient";
import { gql } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home({ articles }) {
  const articleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <div className={styles.wrapper}>
        <div className={styles.pageTitle}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Random pieces on design, coding
            <br />
            and whatever comes to mind
          </motion.p>
        </div>
        <div className={styles.articleWrapper}>
          {articles.map((article, index) => (
            <motion.li
              key={article.id}
              className={styles.articleItem}
              variants={itemVariants}
            >
              <motion.div
                variants={articleVariants}
                initial="hidden"
                animate="visible"
              >
                <Link href={`/${article.slug}`}>{article.title}</Link>
              </motion.div>
            </motion.li>
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
