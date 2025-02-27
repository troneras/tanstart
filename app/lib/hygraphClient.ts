import type { TadaDocumentNode } from 'gql.tada';
import { print } from 'graphql';
const url = process.env.HYGRAPH_CONTENT_API_URL ?? 'https://eu-west-2.cdn.hygraph.com/content/cm7khvq9q022b07wb1mphv5e0/master';

const fetchGraphQL = async <TData, TVariables>(
  document: TadaDocumentNode<TData, TVariables>,
  variables?: TVariables
): Promise<TData> => {
  // Since TadaDocumentNode extends DocumentNode, we can use the 'print' function 
  // from graphql to convert it to a string
  const query = print(document);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
    throw new Error(json.errors[0]?.message || 'GraphQL Error');
  }

  return json.data as TData;
};

export default fetchGraphQL;