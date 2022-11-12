import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/event';
import type { Event } from '~/service/data/event';
import Moment from 'moment';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import type { Artist } from '~/service/data/artist';
import { fetchArtist } from '~/service/data/artist';

export const loader: LoaderFunction = async ({ params }) => {
  const [event, artist] = await Promise.all([
    fetchEvent(params.eventSlug!),
    fetchArtist(params.artistSlug!),
  ]);

  // Remove current artist from the performance list of the event
  event.performances = event.performances?.filter(
    performance => performance.slug !== artist.slug
  );

  event.performances.sort(function (a, b) {
    let first = parseFloat(Moment(a.time).format("HH")) + (parseFloat(Moment(a.time).format("mm")) / 60) ;
    let second = parseFloat(Moment(b.time).format("HH")) + (parseFloat(Moment(b.time).format("mm")) / 60);
    if (first < 6){
      first = first + 24;
    }
    if (second < 6){
      second = second + 24;
    }
    return first - second
  });

  return { event, artist };
};

export default function Index() {
  const { event, artist } = useLoaderData<{ event: Event; artist: Artist }>();

  return (
    <Container>
      <div className="grid">
        <div className="item w3 padding">
					<div>
						<h1 className='big'>{artist.artist[0]?.title}</h1>
						{/* <div className='big times'>{Moment(artist.date).format('D.MM.')}</div> */}
            <div className='event-info'>
              {artist.date &&
                <p><span>Date: </span> <div>{Moment(artist.date).format('ddd DD. MMMM')} </div></p>
              }
              {artist.time &&
                <p><span>Time: </span> <div>{Moment(artist.time).format("HH:mm")} {artist.timeEnd && `- ${Moment(artist.timeEnd).format("HH:mm")}`}</div></p>
              }
              {artist.location[0]?.title &&
                <p><span>Place: </span> <div>{artist.location[0]?.title}{artist.location[1]?.title && `, ${artist.location[1]?.title}`}</div></p>
              }
              {event.openingTime &&
                <p><span>Opening hours: </span> <div>{Moment(event.openingTime).format("HH:mm")} {event.closingTime && `- ${Moment(event.closingTime).format("HH:mm")}`}</div></p>
              }
              {event.ticketDescription &&
                <p><span>Ticket info: </span> <div>{event.ticketDescription}</div></p>
              }
            </div>
					</div>
				</div>

        <div className="item w3 l2">
          <div className='full-img-wrapper'>
            {artist.artist[0].featuredImage[0] ? 
              <img src={artist.artist[0].featuredImage[0]?.url}/>
              :
              <img src={event.featuredImage[0]?.url} alt={event.title} />
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


        {artist.artist[0].complexContent?.map(block => {
          if (block.blockType === 'text') {
            return (
              <>
                <div className='item w5 padding'>
                  <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
                </div>
                <Spacer number={1} border="" />
              </>
            );
          }
        })}
        
        {event.performances?.length > 0 &&
          <>
            <div className="w2 item align-bottom offset blue-bg">
              <div>
                <h2>Lineup:</h2>
              </div>
            </div>
            <Spacer number={4} border="" />
            {event.performances.map((performance, i) => (
              <Link to={`/event/${event.slug}/${performance.slug}`} className='item w2'>
                <div className='img-wrapper artist'>
                  {performance.artist?.[0].featuredImage[0] ?
                    <img src={performance.artist?.[0].featuredImage[0].url} alt={performance.artist[0]?.title} />
                  :
                    <img src={event.featuredImage[0].url} alt={event.title} />
                  }
                </div>
                <div className='white-bg'>
                  <h4>{performance.artist?.[0]?.title}</h4>
                  <p>{Moment(performance.time).format("HH:mm")}, {performance.location?.[0]?.title}</p>
                </div>
              </Link>
            ))}
          </>
        }
      </div>
    </Container>
  );
}
