import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Header from '../../components/home/Header';

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL);

interface IArticles {
  date: string,
  slug: string,
  title: string,
  content: {
    raw: string,
    markdown: string,
    html: string
  }
  coverImage: {
    url: string
  }
  source: {compiledSource: string};
}

export default function Article({article}: {article: IArticles}) {
  console.log("article.title:" + article.title);

  return (
  <>
  <Header/>
  <article className="wrapper">
    <h1>{article.title}</h1>
    <p>{article.date}</p>
    <img src={article.coverImage.url} alt={article.title}/>
    <MDXRemote {...article.source}/>
  </article>
  </>)
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const slug = params.slug as string;

  const query = gql`
  query Article($slug: String!) {
    article (where: {slug: $slug}) {
      date
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
  }`;
  const data = await client.request(query, {slug});
  console.log(data);

  const source = await serialize(data.article.content.markdown);

  return {
    props: { article: {...data.article, source }},
    revalidate: 60 * 60
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  const query = gql`
  query Articles {
    articles {
      slug
    }
  }`;
  const data = await client.request(query);
  return {
    paths: data.articles.map((post) => ({params: {slug: post.slug}})),
    fallback: "blocking"
  }
}