import { gql } from '@urql/core';
import { client } from '~/service/query.server';

export interface Navigation {
  nodes: {
    id: string;
    title: string;
    url: string;
  }[];
}

const query = gql`
  query Navigation {
    nodes(level: 1) {
      ... on newNavigation_Node {
        id
        title
        url
      }
    }
  }
`;

export const getNavigation = () => {
  return client.query<Navigation>(query).toPromise();
};
