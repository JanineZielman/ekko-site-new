import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { Form, useLoaderData, useSearchParams, Link } from '@remix-run/react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import type { SearchResults } from '~/service/data/search';
import { fetchSearchResults } from '~/service/data/search';
import Moment from 'moment';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') as string;

  return fetchSearchResults(q);
};

export const meta: MetaFunction = ({ location }) => {
  const params = new URLSearchParams(location.search);
  return {
    title: params.get('q') ?? 'Search',
  };
};

export default function Oestre() {
  const { artists, events } = useLoaderData<SearchResults>();
  const [searchParams] = useSearchParams();

  return (
    <Container>
      <div className="grid">
        <div className="w3 offset">
          <Form className='search-bar'>
            <input
              type="search"
              name="q"
              id=""
              defaultValue={searchParams.get('q') ?? ''}
              placeholder="Search"
              autoFocus
            />
            <img src="/search.svg"/>
          </Form>
        </div>
        <Spacer number={3} border={''} />
        {events?.length > 0 && (
          <>
            {events.map(event => (
              <Link to={`/${event.type}/${event.slug}`} key={`event-${event.slug}`} className="item w2 l1">
                <div className="img-wrapper">
                  {event.featuredImage?.length > 0 && (
                    <img src={event.featuredImage[0]?.url} alt={event.title} />
                  )}
                </div>
                <div className="white-bg">
                  <h3>{event.title}</h3>
                  <p>{Moment(event.date).format('D.MM.YYYY ')} {event.dateEnd && `- ${Moment(event.dateEnd).format('D.MM.YYYY ')}`}</p>
                </div>
              </Link>
            ))}
          </>
        )}
        {artists?.length > 0 && (
          <>
            {artists.map(artist => (
              // TODO: extract component for rendering an artist block
              <Link to={`/artists/${artist.slug}`} key={`artist-${artist.slug}`} className="item w2">
                {artist.featuredImage?.length > 0 && (
                  <div className="img-wrapper">
                    <img src={artist.featuredImage[0].url} alt={artist.title} />
                  </div>
                )}
                <div className="flex space-between">
                  <div className="white-bg">
                    <h3>{artist.title}</h3>
                    <p>{artist.meta}</p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
        <Spacer number={6} border="" />
      </div>
    </Container>
  );
}
