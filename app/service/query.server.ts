import { createClient } from '@urql/core';

const token = process.env.GRAPHQL_TOKEN as string;
const url = process.env.GRAPHQL_API_URL as string;

const getToken = () => token;

export const client = createClient({
  url,
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    };
  },
});
