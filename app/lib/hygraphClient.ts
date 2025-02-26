import { GraphQLClient } from 'graphql-request';

export default new GraphQLClient(
  process.env.HYGRAPH_CONTENT_API_URL ?? ''
);