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

  console.log(artist)

  return (
    <Container>
      <div className="grid">
        <div className="item w3 l3">
					<div className='white-bg'>
            {artist.artistMeta &&
              <p>{artist.artistMeta}</p>
            }
						<h1 className='big'>{artist.title}</h1>
						{/* <div className='big times'>{Moment(artist.date).format('D/MM')}</div> */}
            <br/>
            {artist.complexContent?.map(block => {
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
            {artist.featuredImage[0] &&
              <img src={artist.featuredImage[0]?.url}/>
            }
          </div>
        </div>
        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
