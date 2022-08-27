import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/event';
import type { Event } from '~/service/data/event';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = ({ params }) => {
  return fetchEvent(params.eventSlug!);
};

export default function Index() {
  const event = useLoaderData<Event>();

  return (
    <Container>
      <div className="grid">
        <div className="item w3 l1">
          <div className="img">
            {event.featuredImage && (
              <img src={event.featuredImage[0]?.url} alt={event.title} />
            )}
          </div>
          <div className="text">
            <p>{event.date}</p>
            <h3>{event.title}</h3>
          </div>
        </div>
        <Spacer number={9} border="" />
        {event.performances?.length > 0 &&
          event.performances.map((performance, i) => (
            <div key={`perf-${i}`} className="item w2 l1">
              <div className="text">
                <p>{performance.artist?.[0].title}</p>
                <p>{performance.artist?.[0].artistMeta}</p>
                <p>{performance.date}</p>
                <p>
                  {performance.time} - {performance.timeEnd}
                </p>
                <Link
                  to={`/event/${event.slug}/${performance.artist?.[0].slug}`}
                >
                  link to artist on this event
                </Link>
              </div>
            </div>
          ))}
      </div>
    </Container>
  );
}
