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
    performace => performace.artist?.[0].slug !== artist.slug
  );

  return { event, artist };
};

export default function Index() {
  const { event, artist } = useLoaderData<{ event: Event; artist: Artist }>();

	console.log(artist)

  return (
    <Container>
      <div className="grid">
        <div className="item w3 l1">
					<div className='padding-right'>
						<p>{artist.artistMeta}</p>
						<h1 className='big'>{artist.title}</h1>
						<div className='big times'></div>
						{artist.complexContent?.map(block => {
							if (block.blockType === 'text') {
								return (
									<div dangerouslySetInnerHTML={{ __html: block.text }}></div>
								);
							}
							if (block.blockType === 'embed') {
								return (
									<div dangerouslySetInnerHTML={{ __html: block.code }}></div>
								);
							}
							if (block.blockType === 'video') {
								// TODO: handle video embeds based on their url
							}
						})}
					</div>
				</div>

        <div className="item w3">
          <div className="header-img artist">
            {artist.featuredImage && (
              <img src={artist.featuredImage[0]?.url} alt={artist.title} />
            )}
          </div>
        </div>
        <Spacer number={6} border="" />
        <div className="w2 item align-bottom offset white-bg">
					<div>
						<h2>Related artists:</h2>
					</div>
        </div>
        <Spacer number={4} border="" />
				{event.performances.map((performance, i) => {
					return(
						<>
							{event.date == performance.date &&
								<div className='item w2'>
									<div className='img-wrapper'><img src={performance.artist[0].featuredImage[0]?.url} alt={performance.artist[0].title} /></div>
									<p>{performance.location[0].title}</p>
									<h4>{performance.time} {performance.artist[0].title}</h4>
								</div>
							}
						</>
					)
				})}
        {/* {event.performances?.length > 0 &&
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
          ))} */}
      </div>
    </Container>
  );
}