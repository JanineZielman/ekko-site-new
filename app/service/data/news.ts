import { fetchFromGraphQL, gql } from '~/service/utils';

export interface RecentNews {
  events: {
    id: number;
    slug: string;
    title: string;
    newsPhoto: { url: string }[];
		pagePhoto: { url: string }[];
  }[];
}

const query = gql`
  query News($limit: Int!) {
    events: entries(section: "news", orderBy: "date DESC", limit: $limit) {
      id
      slug
      title
			newsPhoto {
				url
			}
			pagePhoto {
				url
			}
    }
  }
`;

export const fetchRecentNews = async (limit = 25) => {
  const res = await fetchFromGraphQL(query, { limit });
  const { data } = await res.json();

  return data as RecentNews;
};
