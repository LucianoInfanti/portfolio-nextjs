import Link from "next/link";
import Head from "next/head";

const FirstPost = () => {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <h1>first post</h1>
      <h2>
        <Link href="/">Back to homex</Link>
      </h2>
    </>
  );
};

export default FirstPost;
