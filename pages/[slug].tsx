import { GetStaticPaths, GetStaticProps } from "next";
import { GraphQLClient, gql } from "graphql-request";
import { serialize } from "next-mdx-remote/serialize";
import Header from "../components/home/Header";

const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL);

interface IArticle {
  id: string;
  slug: string;
  title: string;
  content: {
    raw: string;
    html: string;
    markdown: string;
  };
  coverImage: {
    url: string;
  };
  reference: {
    ref: string;
    id: string;
  };
}

export default function Article({ article }) {
  // console.log(article.reference);
  const arr = article.reference;

  const resultado = arr.map((article) => {
    <div>
      <div>{article.id}</div>
      <div>[{article.number}]</div>
      <div dangerouslySetInnerHTML={{ __html: article.link.html }}></div>
    </div>;

    console.log(article);
  });
  return (
    <>
      <Header />

      <div className="wrapper">
        <article>
          <div className="title">
            <h1>{article.title}</h1>
            <div className="date">Published · {article.date}</div>
          </div>
          <img src={article.coverImage.url} alt={article.title} />
          <div dangerouslySetInnerHTML={{ __html: article.content.html }}></div>
          {/* <div > <MDXRemote {...article.source}/> </div> */}
        </article>

        {article.reference.length > 0 && (
          <>
            <div className="divider"></div>
            <h3 className="refTitle">References</h3>
          </>
        )}
        {article.reference.map((article) => (
          <div key={article.id} className="refItem">
            <div className="refNumber">[{article.number}]</div>
            <div
              className="refLink"
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
  const data = await client.request(query);
  return {
    paths: data.articles.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
};