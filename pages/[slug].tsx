import Head from "next/head";
import styles from "./slug.module.css";
import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import { motion } from "framer-motion";
import Link from "next/link";
import ShuffleText from "../components/shuffletext";

// ED: Adicionei esses novos imports
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Context } from '../provider'


const client = new GraphQLClient(process.env.VALUE); //Production env
// const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL);

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

export default function Article({ article }: { article: IArticle }) {

  const context = useContext(Context)
  const router = useRouter()

  // Criei esse evento para mudar a rota
  const handleClick = (event, route) => {
    event.preventDefault()
    context.toggleSiteVisibility()

    setTimeout(() => {
      router.push(route)

      setTimeout(() => {
        context.toggleSiteVisibility()
      }, 600)
    }, 600)
  }

  return (
    <>
      <Head>
        <title>{article.title}</title>
      </Head>

      <div className={styles.bodyWrapper}>
        <div className={styles.backArrow}>
          <div className={styles.arrowWrapper}>
              <a onClick={(event) => handleClick(event, '/')}>
                <span>⇤</span> <ShuffleText text="Back" />
              </a>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <article>
            <div className={styles.title}>
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {article.title}
              </motion.h1>
              <div className={styles.date}>
                Published · {article.date.substring(6).replace(/-/g, ".")}
              </div>
            </div>

            <motion.div className={styles.paragraph}>
              <div>
                <div dangerouslySetInnerHTML={{ __html: article.content.html }} />
              </div>
            </motion.div>
          </article>
        </div>
        <div className="spacer"></div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string;

  const query = gql`
    query Article($slug: String!) {
      article(where: { slug: $slug }) {
        date
        id
        slug
        title
        reference {
          id
          link {
            html
          }
          number
        }
        content {
          raw
          markdown
          html
        }
        coverImage {
          url
        }
      }
    }
  `;
  const data: { article: IArticle | null } = await client.request(query, {
    slug,
  });

  if (!data.article) {
    return {
      notFound: true,
    };
  }
  const source = await serialize(data.article.content.markdown);

  return {
    props: { article: { ...data.article, source } },
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
