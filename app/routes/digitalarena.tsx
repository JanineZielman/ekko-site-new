import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React, {useState, useEffect} from 'react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import { fetchAllVideos } from '~/service/data/arena';
import type { allVideos } from '~/service/data/arena';

export const loader: LoaderFunction = () => {
  return fetchAllVideos();
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as allVideos).entries[0]?.title,
});

export default function DigitalArena() {
  const { entries } = useLoaderData<allVideos>();

	const [videoList, setVideoList] = useState(entries);
	const [randomNumber, setrandomNumber] = useState(0);

	useEffect(() => {
    setrandomNumber(Math.floor(Math.random()*videoList.length))
  }, []);

	console.log(entries)

  return (
    <Container>
      <div className="grid inverted">
				<div className='item w3'>
					<div className='align-bottom'>
						<p className='tag'>#{videoList[randomNumber].projectTag[0].slug}</p>
						<h2>{videoList[randomNumber].artist[0].title} «{videoList[randomNumber].projectTitle}»</h2>
					</div>
				</div>
				<Spacer number={3} border=""/>
				<div className='item w5 l3'>
					{videoList[0] && 
						<div className='video-wrapper'>
							<iframe src={videoList[randomNumber].videoUrl} frameBorder="0"></iframe>
						</div>
					}
				</div>
				<Spacer number={3} border=""/>
        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
