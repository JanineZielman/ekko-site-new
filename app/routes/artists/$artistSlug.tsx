import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Moment from 'moment';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import type { Artist } from '~/service/data/artist';
import { fetchArtist } from '~/service/data/artist';

export const loader: LoaderFunction = async ({ params }) => {
  const [artist] = await Promise.all([
    fetchArtist(params.artistSlug!),
  ]);

  return { artist };
};

export default function Index() {
  const {  artist } = useLoaderData<{ artist: Artist }>();

  return (
    <Container>
      <div className="grid">
        <div className="item w3 l3">
					<div className='padding-right'>
						<h1 className='big'>{artist.artist[0].title}</h1>
						<div className='big times'>{Moment(artist.date).format('D/MM')}</div>
            <br/>
            {artist.artist[0].complexContent?.map(block => {
              if (block.blockType === 'text') {
                return (
                  <div dangerouslySetInnerHTML={{ __html: block.text }}></div>
                );
              }
            })}
					</div>
				</div>

        <div className="item w3 l3 overflow">
          <div className='img-wrapper'>
            {artist.artist[0].featuredImage[0] &&
              <img src={artist.artist[0].featuredImage[0]?.url}/>
            }
          </div>
          <div className="flex space-between blue-bg">
            <div className="info">
              <h4>{artist.artist[0].title}</h4>
              <p>{Moment(artist.time).format("HH:mm")}, {artist.location?.[0]?.title}</p>
            </div>
            <div>
            </div>
          </div>
        </div>
        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
