import { fetchFromGraphQL, gql } from '../utils';

export interface Navigation {
  globalSets: {
    [index: number]: { 
      socialFacebook: string;
      socialInstagram: string;
      socialTwitter: string;
      relatedLinks: {
        linkTitle: string;
        linkUrl: string;
      }[];
    }
  },
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
    globalSets {
      ... on globalInfo_GlobalSet {
        socialFacebook
        socialInstagram
        socialTwitter
        relatedLinks {
          linkTitle
          linkUrl
        }
      }
    }
  }
`;

export const getNavigation = async () => {
  const res = await fetchFromGraphQL(query);
  let { data } = (await res.json()) as { data: Navigation };

  // filter out empty nodes
  data.nodes = data?.nodes.filter(node => !!node.id);

  return data;
};
