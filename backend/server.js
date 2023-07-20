const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const http = require("http");
const { execute, subscribe } = require("graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { useServer } = require("graphql-ws/lib/use/ws");
const WebSocket = require("ws");
const db = require("./models");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    // Add your context logic here
  }
});

const app = express();

// Start the Apollo server
server.start().then(() => {
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);

  // Create WebSocket server
  const wsServer = new WebSocket.Server({
    server: httpServer,
    path: "/subscriptions"
  });

  // Use the `useServer` function to attach the GraphQL WebSocket protocol onto the WebSocket server
  useServer(
    {
      schema,
      execute,
      subscribe,
      onConnect: (ctx) =>
        console.log(
          "Client connected:",
          ctx.extra.request.headers["sec-websocket-key"]
        ),
      onDisconnect: () => console.log("Client disconnected")
    },
    wsServer
  );

  httpServer.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(`🚀 Subscriptions ready at ws://localhost:4000/subscriptions`);
  });
});
