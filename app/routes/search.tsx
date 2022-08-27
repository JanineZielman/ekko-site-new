import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import type { SearchResults } from '~/service/data/search';
import { fetchSearchResults } from '~/service/data/search';

interface Data extends SearchResults {
  query?: string;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') as string;
  const results = await fetchSearchResults(q);

  return {
    ...results,
    query: q,
  };
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as Data).query,
});

export default function Oestre() {
  const { artists, events, query } = useLoaderData<Data>();

  return (
    <Container>
      <div className="grid">
        <div className="item w3">
          <form>
            <input
              type="search"
              name="q"
              id=""
              defaultValue={query}
              placeholder="Search"
            />
          </form>
        </div>
        <Spacer number={3} border={''} />
        {artists?.length > 0 && (
          <>
            <div className="item w2">
              <h2>Artists</h2>
            </div>
            <Spacer number={4} border="" />
            {artists.map(artist => (
              // TODO: extract component for rendering an artist block
              <div key={`artist-${artist.slug}`} className="item w3">
                {artist.featuredImage?.length > 0 && (
                  <div className="img-wrapper">
                    <img src={artist.featuredImage[0].url} alt={artist.title} />
                  </div>
                )}
                <div className="flex space-between">
                  <div className="info">
                    <h3>{artist.title}</h3>
                    <p>{artist.meta}</p>
                  </div>
                </div>
              </div>
            ))}
            <Spacer number={6} border="" />
          </>
        )}
        {events?.length > 0 && (
          <>
            <div className="item w2">
              <h2>Events</h2>
            </div>
            <Spacer number={4} border="" />
            {events.map(event => (
              <div key={`event-${event.slug}`} className="item w3 l1">
                <div className="img">
                  {event.featuredImage?.length > 0 && (
                    <img src={event.featuredImage[0]?.url} alt={event.title} />
                  )}
                </div>
                <div className="text">
                  <p>{event.date}</p>
                  <h3>{event.title}</h3>
                </div>
              </div>
            ))}
            <Spacer number={6} border="" />
          </>
        )}
      </div>
    </Container>
  );
}
