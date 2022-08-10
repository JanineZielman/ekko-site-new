import { gql } from '@urql/core';
import { client } from '~/service/query.server';

export interface HomPageData {
  events: {
    id: number;
    title: string;
    url: string;
    featuredImage: { url: string }[];
    organizer: { title: string }[];
    date: string;
    dateEnd?: string;
    location?: { title: string }[];
    performances?: {
      artist: { url: string; title: string }[];
    }[];
  }[];
  news: {
    title: string;
    id: number;
    url: string;
    newsIntro: string;
    complexContent: {
      text: string;
      title: string;
      typeHandle: string;
    }[];
  }[];
}

const query = gql`
  query HomePage {
    events: entries(section: "events", orderBy: "date DESC", limit: 8) {
      id
      slug
      title
      url
      ... on events_event_Entry {
        featuredImage: eventFeaturedPhoto {
          url
        }
        organizer {
          title
        }
        date @formatDateTime(format: "d/n")
        dateEnd
        location {
          title
        }
        performances {
          ... on performance_performance_Entry {
            location {
              title
            }
            artist {
              url
              ... on artists_artist_Entry {
                title
              }
            }
          }
        }
      }
    }
    news: entries(section: "news") {
      title
      id
      url
      ... on news_newsEntry_Entry {
        newsIntro
        complexContent {
          ... on complexContent_text_BlockType {
            text
            title
            typeHandle
          }
        }
      }
    }
  }
`;

export const mapHomeData = (
  entries: Awaited<ReturnType<typeof getHomeData>>
) => {
  return entries.data?.events.map(event => ({
    ...event,
    organizer: event.organizer?.map(o => o.title),
    location: event.location?.map(l => l.title),
    performances: event.performances?.map(p => p.artist),
  }));
};

export const getHomeData = () => {
  return client.query<HomPageData>(query).toPromise();
};
