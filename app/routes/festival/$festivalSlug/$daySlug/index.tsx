import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/festival';
import type { Event } from '~/service/data/festival';
import Moment from 'moment';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = async ({ params }) => {
  // return fetchEvent(params.festivalSlug!);
  const [event] = await Promise.all([
    fetchEvent(params.festivalSlug!),
  ]);

  const date = params.daySlug

  return { event, date };
};

export default function Index() {
  const {  event } = useLoaderData<{ event: Event }>();
  const {  date } = useLoaderData<{ date: any }>();

  const res=event.performances.slice(0).sort((a,b)=>
  a.date.localeCompare(b.date)||a.time.localeCompare(b.time));
  const filter=res.filter(item => Moment(item.date).format("YYYY-MM-DD") === date);

  console.log('event', event.performances.filter(item => Moment(item.date).format("YYYY-MM-DD") === date))
  console.log('filter', filter)

  return (
    <Container>
			<div className="grid">

        <div className="item w3 padding">
					<div className='text'>
           	<h1 className='big'>{Moment(date).format('ddd D.MM.')}</h1>
             {event.program.map((item, i) => {
              return(
                <>
                 { Moment(item.date).format("YYYY-MM-DD") == date &&
                   <div className='event-info'>
                      {item.startTime &&
                        <p><span>Time: </span> <div>{Moment(item.startTime).utcOffset('+0100').format("HH:mm")} {item.endTime && `- ${Moment(item.endTime).utcOffset('+0100').format("HH:mm")}`}</div></p>
                      }
                      {item.ticketInformation &&
                        <p><span>Ticket info: </span> <div>{item.ticketInformation}</div></p>
                      }
                    </div>
                  }
                </>
              )
             })}
					</div>
				</div>
        <div className="item w3 l2">
          <Link to={`${filter[0].slug}`} className='item w2 l2'>
            <div className='img-wrapper'><img src={filter[0].artist[0].featuredImage[0].url}/></div>
            <div className="flex space-between white-bg height">
              <div className="info">
                <h4>{filter[0].artist[0].title}</h4>
                <p>{Moment(filter[0].time).utcOffset('+0100').format("HH:mm")}, {filter[0].location[0].title}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="item w2 button small">
          {event.tickets[0]?.ticketLink &&
            <div className='view-all'>
              <a href={event.tickets[0]?.ticketLink} target="_blank">Tickets</a>
            </div>
          }
        </div>
      
        {filter.slice(1).map((item, i) => {
          return(
            <Link to={`${item.slug}`} className='item w2 l2'>
              <div className='img-wrapper'><img src={item.artist[0].featuredImage[0].url}/></div>
              <div className="flex space-between white-bg height">
                <div className="info">
                  <h4>{item.artist[0].title}</h4>
                  <p>{Moment(item.time).utcOffset('+0100').format("HH:mm")}, {item.location[0].title}</p>
                </div>
              </div>
            </Link>
          )
        })}
        <Spacer number={6} border=""/>
			</div>
		</Container>
  );
}
