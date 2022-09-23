import { GraphQLClient, gql } from "graphql-request";

const url =
  "https://api-sa-east-1.hygraph.com/v2/cl8ds4bf023r101uecesx4gzm/master";

const client = new GraphQLClient(url, {
  headers: {
    Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjM4OTUwMDEsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2w4ZHM0YmYwMjNyMTAxdWVjZXN4NGd6bS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiNTljYzQ2N2ItMDcwNS00NTJhLTk5ZmEtOWI4ZGZkYTMyNTYzIiwianRpIjoiY2thNWoyZW9iMDN0YzAxd2gwZGZkNjdyeSJ9.tYBxLpEYfpx1Bm7pof29dVlGc6e7Wy9BN0DHinA42GOyIhkX3Em6WdyuNx1DO9WCNQg-jHvUCrBOtBgq2TGGgc2pX9XuzheoNwt6NWDOCJk_2ltAD4RFyWuVnhDxeT0FSv5xYjweo7WGxmaahLvHbXDnrHReKiQUlLkGg4KTyw51CoXnVxKq-mButcHVMLPtrm0Mpbx3DvJGAEGGHYIij6Y6XtoqwDo7gUSwGVR0w9HIi9ez8mGFciUeVK2g_Q3EtxK33OKhRYiAAlb0_qSx8ziX2QYH3kFmink05STphQbrsqOowlccFj0pUbRYVBUOQ4lAMoqses9Cjx9RcOUNHvEv6ucZ1wMCuurAmd2I05u0WPpO7PL_2AFGtQrgNZ3Kx2MzJwZnZDoS-V5XWlF_QXD-jhTe5sMtBz3aw89TOfwsenL1H1D5F1BRZbZOQMqzIL6GjfBg9NOrdvnjmUcKPqjD7Hrit0tU4qEoBGPNda7w9_iE97snxoHCZIhNzI6UMCXrSsIAcZEc_e1GL2RMkSnYErqQzmxvsFBr-fowEvc8-iD6rs3irrFJwEPqBm0NnCFq8vcHjdWpbBkMYziumPzlrb2pnyYWpZAp7t-fG_qegCepGbFLUQHAHZ9lACEs_zo-qyvqa8b81lhMlWPYfCbXFcY-uq0uXT7BBm6DPSQ`,
  },
});

const query = gql`
  query MyQuery {
    postsConnection {
      edges {
        node {
          date
          id
          slug
          title
        }
      }
    }
  }
`;

export function GraphQLRequest() {
  const getPosts = async () => {
    const variables = { title };
    const response = await client.request(query, variables);
    console.log("RESPONSE FROM GRAPHQL-REQUEST API CALL", response);
  };

  return {
    props: { title },
  };
}
