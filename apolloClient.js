import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-sa-east-1.hygraph.com/v2/cl8emijoy2yqz01uedk8i7z1c/master",
  cache: new InMemoryCache(),
});

export default client;
