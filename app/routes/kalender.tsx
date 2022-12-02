import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchAllEvents } from '~/service/data/events';
import type { AllEvents } from '~/service/data/events';

import Container from '~/components/container';
import Kalender from '~/components/kalender';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = () => {
  return fetchAllEvents();
};

export default function Index() {
  let { events } = useLoaderData<AllEvents>();

  let filteredEvents = [];
  var currentTime = new Date();

  filteredEvents = events.filter((item: any) => {
    var itemDate = new Date(item.date);
    itemDate.setDate(itemDate.getDate() + 2);
    return itemDate.getTime() >= currentTime.getTime();
  });

  return (
    <Container>
      <div className="kalender">
			  <div className="grid">
          <Kalender filteredEvents={filteredEvents}/>
          <Spacer number={6} border={""}/>
        </div>
      </div>
    </Container>
  );
}
