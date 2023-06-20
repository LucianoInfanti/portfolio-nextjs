import styles from "./index.module.css";
import { useState } from "react";
import Link from "next/link";
import client from "../../apolloClient";
import { gql } from "@apollo/client";
import { motion } from "framer-motion";
import ShuffleText from "../../components/shuffletext";

export default function Writing({ articles }) {
  const [activeArticle, setActiveArticle] = useState(null);

  const variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.05, 0.7, 0.1, 1.0],
        duration: 2,
        staggerChildren: 0.05,
      },
    },
    hover: {
      opacity: 0.3,
      transition: { duration: 0.3, ease: [0.05, 0.7, 0.1, 1.0] },
    },
    hoverOut: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.05, 0.7, 0.1, 1.0] },
    },
    exit: {
      y: 30,
      opacity: 0,
      ease: [0.2, 0.0, 0, 1.0],
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial="hidden"
      animate="visible"
      // exit="exit"
    >
      <div className={styles.gradient}></div>
      <div className={styles.contentWrapper}>
        <motion.span
          variants={variants}
          className={styles.overline}
          key="contentWrapper"
        >
          2022 — 2023
        </motion.span>
        <motion.ul
          className={styles.articlesWrapper}
          variants={variants}
          key="articlesWrapper"
        >
          {articles.map((article, index) => (
            <motion.li
              key={article.id}
              variants={variants}
              className={`${styles.articleItem} ${
                (index + 1) % 2 === 0 ? styles.itemListItalic : ""
              }`}
              onMouseEnter={() => setActiveArticle(article.id)}
              onMouseLeave={() => setActiveArticle(null)}
              animate={
                activeArticle !== null && activeArticle !== article.id
                  ? "hover"
                  : "hoverOut"
              }
            >
              <Link href={`/writing/${article.slug}`}>
                <a>
                  <ShuffleText text={article.title} />
                </a>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
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
