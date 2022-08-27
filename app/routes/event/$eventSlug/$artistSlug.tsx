import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/event';
import type { Event } from '~/service/data/event';

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
    performace => performace.artist?.[0].slug !== artist.slug
  );

  return { event, artist };
};

export default function Index() {
  const { event, artist } = useLoaderData<{ event: Event; artist: Artist }>();

  return (
    <Container>
      <div className="grid">
        <Spacer number={3} border="" />
        <div className="item w3 l1">
          <div className="img">
            {artist.featuredImage && (
              <img src={artist.featuredImage[0]?.url} alt={artist.title} />
            )}
          </div>
          <div className="text">
            <p>{artist.artistMeta}</p>
            <h3>{artist.title}</h3>
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
        <Spacer number={6} border="" />
        <div className="item w3 l1">
          <h2>Part of event:</h2>
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
        <Spacer number={3} border="" />
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
