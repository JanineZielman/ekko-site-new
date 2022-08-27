import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchAllEvents } from '~/service/data/events';
import type { AllEvents } from '~/service/data/events';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = () => {
  return fetchAllEvents();
};

export default function Index() {
  const { events } = useLoaderData<AllEvents>();

  return (
    <Container>
      <div className="kalender">
        <div className="grid">
          {events.map((item, i) => {
            return (
              <div key={`event-${i}`} className="item w3 l1">
                <div className="img">
                  {item.featuredImage && (
                    <img src={item.featuredImage[0]?.url} alt={item.title} />
                  )}
                </div>
                <div className="text">
                  <p>{item.date}</p>
                  <h3>{item.title}</h3>
                  {item.type === 'event' && (
                    <Link to={`/event/${item.slug}`}>link to event page</Link>
                  )}
                  {item.type === 'festival' && (
                    <Link to={`/festival/${item.slug}`}>
                      link to festival page
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
          <Spacer number={6} border="" />
        </div>
      </div>
    </Container>
  );
}
