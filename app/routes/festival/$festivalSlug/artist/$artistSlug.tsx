import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/festival';
import type { Event } from '~/service/data/festival';
import Moment from 'moment';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import type { Artist } from '~/service/data/artist';
import { fetchArtist } from '~/service/data/artist';

export const loader: LoaderFunction = async ({ params }) => {
  const [event, artist] = await Promise.all([
    fetchEvent(params.festivalSlug!),
    fetchArtist(params.artistSlug!),
  ]);

  // Remove current artist from the performance list of the event
  event.performances = event.performances?.filter(
    performance => performance.slug !== artist.slug
  );

  return { event, artist };
};

export default function Index() {
  const { event, artist } = useLoaderData<{ event: Event; artist: Artist }>();

  const related = event.performances.filter((item: any) => {
    return item.date == artist.date
  });

  const current = event.program.filter((item: any) => {
    return item.date == artist.date
  });

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

  return (
    <Container>
      <div className="grid">
        <div className="item w3 padding">
					<div className='text'>
            {artist.artist[0].artistMeta &&
              <p>{artist.artist[0].artistMeta}</p>
            }
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
              {current[0]?.startTime &&
                <p><span>Opening hours: </span> <div>{Moment(current[0].startTime).format("HH:mm")} {current[0].endTime && `- ${Moment(current[0].endTime).format("HH:mm")}`}</div></p>
              }
              {current[0]?.ticketInformation &&
                <p><span>Ticket info: </span> <div>{current[0].ticketInformation}</div></p>
              }
            </div>
					</div>
				</div>

        <div className="item w3 l2">
          <div className='full-img-wrapper'>
            <img src={artist.artist[0].featuredImage[0]?.url}/>
          </div>
        </div>

        <div className="item w2 button small">
          {event.tickets[0]?.ticketLink &&
            <div className='view-all'>
              <a href={event.tickets[0]?.ticketLink} target="_blank">Tickets</a>
            </div>
          }
        </div>
        <Spacer number={1} border="" />

       
        {artist.artist[0].complexContent?.[0]?.blockType === 'text' &&
          <>
            <div className='w5 item more-padding' dangerouslySetInnerHTML={{ __html: artist.artist[0].complexContent?.[0].text }}></div>
            <Spacer number={1} border="" />
          </>
        }

        
        {artist.artist[0].complexContent?.slice(1).map(block => {
          if (block.blockType === 'text') {
            return (
              <>
                <div className='item w3 l3'>
                  <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
                </div>
                <Spacer number={9} border="" />
              </>
            );
          }
          if (block.blockType === 'embed') {
            return (
               <>
                <Spacer number={1} border="" />
                <div className='video item w5 l3'>
                  <div dangerouslySetInnerHTML={{ __html: block.code }}></div>
                </div>
                <Spacer number={2} border="" />
              </>
            );
          }
          if (block.blockType === 'video') {
            return (
              <>
                <Spacer number={1} border="" />
                <div className='video item w5 l3'>
                  <iframe src={block.videoUrl.replace('https://youtu.be/', 'https://www.youtube.com/embed/')}/>
                </div>
                <Spacer number={2} border="" />
              </>
            );
          }
        })}

        <Spacer number={2} border="" />
         <div className='w2 item align-bottom offset white-bg'>
          <div>
            <h2>Full Program</h2>
          </div>
        </div>
        <Spacer number={2} border="" />
        <Spacer number={2} border="" />
        <div className='w4 item'>
          {event.program.map((item, i) =>{
            return(
              <div className='program-info'>
                <Link to={`/festival/${event.slug}#Program`}>
                  <div className='program-date'><h3>{Moment(item.date).format('ddd DD. MMM')}</h3></div>
                  <div className='event-info'>
                    {item.startTime && <p><span>Time: </span> <div>{Moment(item.startTime).format('HH:mm')} {item.endTime && `- ${Moment(item.endTime).format('HH:mm')}`}</div></p>}
                    {item.ticketInformation && <p><span>Ticket info: </span> <div>{item.ticketInformation}</div></p>}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>

        {related.length > 0 ?
          <div className="w2 item align-bottom offset white-bg">
            <div>
              <h2>Related artists:</h2>
            </div>
          </div>
        :  <Spacer number={2} border="" />}
        <Spacer number={4} border="" />
        {event.performances.map((performance, i) => {
          return(
            <>
              {performance.date == artist.date &&
                <Link to={`/festival/${event.slug}/${performance.slug}`} className='item w2'>
                  <div className='img-wrapper'><img src={performance.artist[0].featuredImage[0]?.url} alt={performance.artist[0].title} /></div>
                  <div className='flex space-between white-bg height'>
                    <div className='info'>
                      <h4>{performance.artist[0].title}</h4>
                      <p>{Moment(performance.time).format("HH:mm")}, {performance.location[0].title}</p>
                    </div>
                    <div className="times big">{Moment(performance.date).format('D.MM.')}</div>
                  </div>
                </Link>
              }
            </>
          )
        })}
        {related.length % 3 != 0 && related.length > 0 &&
          <>
          <Spacer number={2} border=""/>
          {related.length % 2 != 0 &&
            <Spacer number={2} border=""/>
          }
          </>
        }
        <Spacer number={6} border=""/>
 
      </div>
    </Container>
  );
}