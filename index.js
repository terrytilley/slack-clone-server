import path from 'path';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';

const SECRET = '`sfdgh4kjghfdse22sfghtgytfcesdz38';
const SECRET2 = '`njkbhgvfcxvbfg34vnbvcfxfd73cgbv1';
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers'), { extensions: ['.js'] })
);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = process.env.PORT || 8000;
const app = express();
const graphqlEndpoint = '/graphql';

app.use(cors('*'));
app.use(
  graphqlEndpoint,
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1,
      },
      SECRET,
      SECRET2,
    },
  })
);

app.use('/graphiql', graphiqlExpress({ endpointURL: graphqlEndpoint }));

models.sequelize.sync({}).then(() => {
  app.listen(PORT);
});
