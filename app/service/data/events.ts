import { fetchFromGraphQL, gql } from '~/service/utils';

export interface Event {
  id: number;
  slug: string;
  title: string;
  url: string;
  type: 'event' | 'festival';
  featuredImage: { url: string }[];
  date: string;
}

export interface AllEvents {
  events: Event[];
}

const query = gql`
  query Kalender($limit: Int!) {
    events: entries(section: "events", orderBy: "date DESC", limit: $limit) {
      id
      slug
      title
      url
      type: typeHandle
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
