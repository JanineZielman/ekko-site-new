import { fetchFromGraphQL, gql } from '~/service/utils';

export interface PageEntry {
	nodes: {
    id: string;
    title: string;
    url: string;
  }[],
  entry: {
    id: number;
    title: string;
    intro: string;
    lineup: string;
		performances: {
			[index: number]: { 
				id: number; 
				title: string;
				date: string;
				time: string;
				timeEnd: string;
				artist: {
					[index: number]: { 
						id: number;
						title: string;
						featuredImage: { url: string }[];
					}
				}
				location: {
					[index: number]: { 
						id: number;
						title: string;
					}
				}
			};
		}
  };
}


const query = gql`
  query Festival{
		nodes(level: 1) {
      ... on festivalMenu_Node {
        id
        title
        url
      }
    }
    entry(type: "festival") {
      id
      title
      intro
			lineup
			... on events_festival_Entry {
				performances {
					id
					title
					... on performance_performance_Entry {
						date
						time
						timeEnd
						artist {
							id
							title
							featuredImage: artistFeaturedPhoto {
								url
							}
						}
						location {
							id
							title
						}
					}
				}
			}
    }
  },
`;

export const fetchContentPage = async () => {
  const res = await fetchFromGraphQL(query);
  const { data } = await res.json();

  return data as PageEntry;
};
