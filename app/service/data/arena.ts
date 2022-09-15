import { fetchFromGraphQL, gql } from '~/service/utils';

export interface allVideos {
  entries: {
    id: number;
    title: string;
		projectTitle: string;
		projectTag: {
			slug: string;
		}[];
		pageContent: string;
		videoUrl: string;
		artist: {
			title: string;
			slug: string;
		}[];
		performances: {
			title: string;
			slug: string;
		}[];
  }[];
}

const query = gql`
  query Arena{
    entries(type: "arenaVideo") {
			id
			title
			... on arena_arenaVideo_Entry {
				projectTitle
				projectTag{
					slug
				}
				pageContent
				videoUrl
				artist {
					title
					slug
				}
				performances {
					title
					slug
				}
			}
		}
  }
`;

export const fetchAllVideos = async () => {
  const res = await fetchFromGraphQL(query);
  const { data } = await res.json();

  return data as allVideos;
};
