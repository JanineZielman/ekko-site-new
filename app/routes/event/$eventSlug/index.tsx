import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/event';
import type { Event } from '~/service/data/event';
import Moment from 'moment';

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
        <div className="item w3 padding">
					<div className=''>
						<h1 className='big'>{event.title}</h1>
						<div className='big times'>{Moment(event.date).format('D.MM.')}</div>
            <p>{event.location[0]?.fullTitle}</p>
					</div>
				</div>

        <div className="item w3 l2">
          <div className='img-wrapper'>
            {event.featuredImage[0] && 
              <img src={event.featuredImage[0]?.url } alt={event.title}/>
            }
          </div>
        </div>

         <div className="item w2 button small">
          {event.ticketLink &&
            <div className='view-all'>
              <a href={event.ticketLink} target="_blank">Tickets</a>
            </div>
          }
        </div>
        <Spacer number={1} border="" />

        {event.performances?.length > 0 &&
          <>
            <div className="w2 item align-bottom offset blue-bg">
              <div>
                <h2>Artists:</h2>
              </div>
            </div>
            <Spacer number={4} border="" />
            {event.performances.map((performance, i) => (
              <Link to={`/event/${event.slug}/${performance.slug}`} className='item w2 white-bg'>
                <div className='img-wrapper artist'>
                  {performance.artist?.[0].featuredImage[0] ?
                    <img src={performance.artist?.[0].featuredImage[0].url} alt={performance.artist[0].title} />
                  :
                    <img src={event.featuredImage[0].url} alt={event.title} />
                  }
                  </div>
                <h4>{performance.artist?.[0].title}</h4>
                <p>{Moment(performance.time).format("HH:mm")}, {performance.location?.[0]?.title}</p>
              </Link>
            ))}
          </>
        }

        {event.performances.length % 3 != 0 &&
          <>
          <Spacer number={2} border=""/>
          {event.performances.length % 2 != 0 &&
            <Spacer number={2} border=""/>
          }
          </>
        }

        <Spacer number={6} border="" />

        {event.ticketDescription &&
          <>
            <div className='item w4 padding'>
              <h1 className='times'>Tickets</h1>
              <p>{event.ticketDescription}</p>
            </div>
            <Spacer number={4} border="" />
            <div className='w2'>
              <div className='item w2 align-top blue-bg offset padding'>
                <a className='read-more' href={event.ticketLink} target="_blank">Buy tickets</a>
              </div>
            </div>
            <Spacer number={6} border="" />
          </>
        }
      </div>
    </Container>
  );
}
