import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import Header from "../components/home/Header/Header";
import Head from "next/head";

import styles from "./slug.module.css";
import Social from "../components/Social/Social";
import AnimatedTextWord from "./AnimatedTextWords";

//Production (NOT WORKING)
// const client = new GraphQLClient(process.env.VALUE);

// Development: make sure `NEXT_PUBLIC_GRAPHCMS_URL` is written as in `.env.local`
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

export default function Article({ article }: { article: IArticle }) {
  return (
    <>
      {" "}
      <Head>
        <title>Luciano Infanti</title>
      </Head>

      <div className={styles.wrapper}>
        <article>
          <div className={styles.title}>
            <h1>
              <AnimatedTextWord text={article.title} />
            </h1>
            <div className={styles.date}>Published · {article.date}</div>
          </div>
          <img
            className={styles.img}
            src={article.coverImage.url}
            alt={article.title}
          />
          <div
            className={styles.paragraph}
            dangerouslySetInnerHTML={{ __html: article.content.html }}
          ></div>
        </article>

        {article.reference.length > 0 && (
          <>
            <div className="divider"></div>
            <h3 className={styles.referenceTitle}>References</h3>
          </>
        )}
        {article.reference.map((article) => (
          <div key={article.id} className={styles.referenceItem}>
            <div
              className={styles.refLink}
              dangerouslySetInnerHTML={{ __html: article.link.html }}
            ></div>
          </div>
        ))}
      </div>
      <div className="spacer"></div>
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
