import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchAllEvents } from '~/service/data/events';
import type { AllEvents } from '~/service/data/events';
import Moment from 'moment';

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
              <Link to={`/${item.type}/${item.slug}`} key={`event-${i}`} className="item w3 l1">
                <div className="img">
                  {item.featuredImage && (
                    <img src={item.featuredImage[0]?.url} alt={item.title} />
                  )}
                </div>
                <div className="text">
                  <p>{item.date}</p>
                  <br/>
                  <h3>{item.title}</h3>
                  {item.openingTime &&
                    <p>{Moment(item.openingTime).format("HH:mm")}  {item.closingTime && <>- {Moment(item.closingTime).format("HH:mm")} </>}</p>
                  }
                </div>
              </Link>
            );
          })}
          <Spacer number={6} border="" />
        </div>
      </div>
    </Container>
  );
}
