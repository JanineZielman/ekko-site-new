import { fetchFromGraphQL, gql } from '~/service/utils';

export interface AllEvents {
  events: {
    id: number;
    title: string;
    url: string;
    featuredImage: { url: string }[];
    date: string;
  }[];
}

const query = gql`
  query Kalender($limit: Int!) {
    events: entries(section: "events", orderBy: "date DESC", limit: $limit) {
      id
      slug
      title
      url
      ... on events_event_Entry {
        featuredImage: eventFeaturedPhoto {
          url
        }
        date @formatDateTime(format: "d/n")
      }
      ... on events_festival_Entry {
        featuredImage: eventFeaturedPhoto {
          url
        }
        date @formatDateTime(format: "d/n")
      }
    }
  }
`;

export const fetchAllEvents = async (limit = 25) => {
  const res = await fetchFromGraphQL(query, { limit });
  const { data } = await res.json();

  return data as AllEvents;
};
