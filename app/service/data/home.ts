import { fetchFromGraphQL, gql } from '~/service/utils';

export interface RecentEvents {
  events: {
    id: number;
    slug: string;
    title: string;
    url: string;
    type: 'event' | 'festival';
    featuredImage: { url: string }[];
    date: string;
    dateEnd: string;
    isMultiDay: boolean;
    ticketLink: string;
    performances:{
      title: string;
      slug: string;
      date: string;
      time: string;
      timeEnd: string;
      location: {
        title: string;
        fullTitle: string;
      }[];
      artist: {
        title: string;
        featuredImage: { url: string }[];
      }[];
    }[];
  }[];
}

const query = gql`
  query HomePage($limit: Int!) {
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
        date
        dateEnd
        isMultiDay
        ticketLink
        performances {
          title
          slug
          date
          time
          timeEnd
          location {
            title
            fullTitle
          }
          ... on performance_performance_Entry {
            artist {
              title
              ... on artists_artist_Entry {
                featuredImage: artistFeaturedPhoto{
                  url
                }
              }
            }
          }
        }
      }
      ... on events_festival_Entry {
        featuredImage: eventFeaturedPhoto {
          url
        }
        date
        dateEnd
        performances {
          title
          slug
          date
          time
          timeEnd
          location {
            title
            fullTitle
          }
          ... on performance_performance_Entry {
            artist {
              title
              ... on artists_artist_Entry {
                featuredImage: artistFeaturedPhoto{
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const fetchRecentEvents = async (limit = 2) => {
  const res = await fetchFromGraphQL(query, { limit });
  const { data } = await res.json();

  return data as RecentEvents;
};
