import Head from "next/head";
import Header from "../components/home/Header";

import client from "../apolloClient";
import { gql } from "@apollo/client";
import Link from "next/link";

export default function Writing({ articles }) {
  return (
    <>
      <Header />
      <p>2021 — 2022</p>
      <p></p>

      <ul>
        {articles.map((article, i) => (
          <li key={article.id}>
            <Link href={`/posts/${article.slug}`}>{article.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Articles {
        articles {
          id
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
