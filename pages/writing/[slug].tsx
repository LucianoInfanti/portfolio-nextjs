import styles from "./slug.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import { motion } from "framer-motion";

// const client = new GraphQLClient(process.env.VALUE); //Production env
const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL);

interface IArticle {
  articles: any;
  id: string;
  slug: string;
  title: string;
  date: string;
  content: {
    raw: string;
    html: string;
    markdown: string;
  };
  coverImage: {
    url: string;
  };
  reference: {
    id: string;
    link: {
      html: string;
    };
    number: string;
  }[];
  source: string;
}

export default function Article({
  article,
  nextArticle,
}: {
  article: IArticle;
  nextArticle: IArticle;
}) {
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: [0.05, 0.7, 0.1, 1.0],
        duration: 1.2,
        staggerChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: [0.05, 0.7, 0.1, 1.0], duration: 1.2 },
    },
  };

  return (
    <div className={styles.slugWrapper}>
      <div className={styles.gradient}></div>
      <motion.article
        exit={{
          opacity: 0,
          y: 30,
          transition: { duration: 0.8, ease: [0.3, 0.0, 0.8, 0.15] },
        }}
        key="article"
        className={styles.contentWrapper}
      >
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          key="mainContent"
          className={styles.HeaderWrapper}
        >
          <motion.h1
            key="title"
            variants={childVariants}
            className={styles.title}
          >
            {article.title}
          <motion.span className={styles.date} key="published">
            Published — {article.date.substring(5).replace(/-/g, "/")}
          </motion.span>
          </motion.h1>
        </motion.div>
        {article?.coverImage && (
          <motion.div
            initial={{ y: 600 }}
            animate={{ y: 0 }}
            transition={{ ease: [0.05, 0.7, 0.1, 1.0], duration: 1.2 }}
            className={styles.coverImageWrapper}
          >
            <motion.img
              whileHover={{
                scale: 0.98,
                transition: { duration: 0.3, ease: [0.05, 0.7, 0.1, 1.0] },
              }}
              className={styles.coverImage}
              src={article.coverImage.url}
              alt={article.title}
            />
          </motion.div>
        )}

        <motion.div
          className={styles.paragraph}
          initial="hidden"
          animate="visible"
          variants={childVariants}
        >
          <div dangerouslySetInnerHTML={{ __html: article.content.html }} />

          <div className={styles.divider}></div>

          <div className={styles.nextArticleWrapper}>
            <div className={styles.nextArticle}>
              <span className={styles.nextRead}>Next Read</span>

              <Link href={`/writing/${nextArticle.slug}`}>
                <a>{nextArticle.title}</a>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;
  console.log("Slug:", slug); // Debug the slug

  const query = gql`
    query ArticleAndArticles($slug: String!) {
      article: article(where: { slug: $slug }) {
        date
        id
        slug
        title
        content {
          raw
          markdown
          html
        }
        coverImage {
          url
        }
      }
      articles: articles {
        slug
        title
      }
    }
  `;

  const data: { article: IArticle | null; articles: IArticle[] } =
    await client.request(query, { slug });

  if (!data.article) {
    return {
      notFound: true,
    };
  }

  const source = await serialize(data.article.content.markdown);

  const otherArticles = data.articles.filter(
    (article) => article.slug !== slug
  );
  const nextArticle =
    otherArticles[Math.floor(Math.random() * otherArticles.length)];

  return {
    props: {
      article: { ...data.article, source },
      nextArticle,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
    query Articles {
      articles {
        slug
      }
    }
  `;
  const data: IArticle = await client.request(query);
  return {
    paths: data.articles.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
};
