import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  from
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getAuth } from "firebase/auth";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext(async (_, { headers }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken(true) : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    connectionParams: async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user ? await user.getIdToken(true) : null;
      return {
        authToken: token
      };
    }
  })
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink, // Use wsLink for subscriptions
  authLink.concat(httpLink) // Use authLink.concat(httpLink) for other operations
);

const client = new ApolloClient({
  link: from([errorLink, link]),
  cache: new InMemoryCache()
});

console.log("Initializing Apollo Client...");
console.log("Apollo Client Configuration:", client);

export default client;
