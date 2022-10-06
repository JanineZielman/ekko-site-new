import { fetchFromGraphQL, gql } from '~/service/utils';

export interface PageEntry {
  entry: {
    id: number;
    title: string;
    pageTitle: string;
    url: string;
    contact: string;
    photo: { url: string }[];
    content: string;
    gallery: { url: string }[];
    relatedLinks: {
      linkTitle: string;
      linkUrl: string;
    }[];
    pastEvents:{
      eventTitle: string;
      date: string;
      dateEnd: string;
      artists: string;
      isFestival: string;
    }[];
  };
}

// ... on about_about_Entry {}
// Question: how to use the fragment but query from multiple single type entries?
// Note: this assumes that all entries queried by this are using same fields
const query = gql`
  query ($slug: [String]) {
    entry(slug: $slug) {
      id
      title
      pageTitle
      contact
      gallery {
        url
      }
      photo: pagePhoto {
        url
      }
      content: pageContent
      relatedLinks {
        linkTitle
        linkUrl
      }
      ... on archive_archive_Entry {
			  pastEvents{
          ... on pastEvents_event_BlockType{
            eventTitle
            date
            dateEnd
            artists
            isFestival
          }
        }
      }
    }
  }
`;

export const fetchContentPage = async (slug: string) => {
  const res = await fetchFromGraphQL(query, { slug });
  const { data } = await res.json();

  return data as PageEntry;
};
