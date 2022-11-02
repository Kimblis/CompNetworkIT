import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';

import { registerGraphqlEnums } from './Enums';
import { HttpStatusCodePlugin } from './Plugins';

const originWhitelist = [
  // local
  'http://localhost:3030',
  'http://localhost:3000',
  'https://comparch.eu.ngrok.io',
];

export const graphQLOptions = {
  autoSchemaFile: `${process.cwd()}src/schema.gql`,
  sortSchema: true,
  fieldResolverEnhancers: ['interceptors'],
  driver: ApolloDriver,
  playground: true,
  introspection: true,
  plugins: [HttpStatusCodePlugin],
  installSubscriptionHandlers: true,
  formatError: ({ message, extensions }: GraphQLError) => ({ message, extensions }),
  cors: {
    credentials: true,
    origin: (origin: string, callback: (err: Error, value?: boolean) => void) => {
      if (!origin || originWhitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`origin ${origin} is not allowed by cors`);
        callback(new Error('Not allowed by CORS'));
      }
    },
  },
};

export * from './types';
registerGraphqlEnums();
