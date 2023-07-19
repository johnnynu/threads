const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const db = require("./models");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

async function startApolloServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startApolloServer();
