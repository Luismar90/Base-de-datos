const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const typeDefs = require('./project-war/typeDefs');
const resolvers = require('./project-war/resolvers');

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  // Serve static files from the "public" directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Route for the homepage
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen({ port: 3001 }, () =>
    console.log(`Servidor corriendo en http://localhost:3001${server.graphqlPath}`)
  );
}

startServer();