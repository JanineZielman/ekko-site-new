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
	const [next, setNext] = useState(0);
	const [prev, setPrev] = useState(0);

	useEffect(() => {
    setrandomNumber(Math.floor(Math.random()*videoList.length))
		if (randomNumber < (videoList.length - 1)){
			setNext(randomNumber + 1)
		}
		if (randomNumber == (videoList.length - 1)){
			setNext(0)
		}
		if (randomNumber > 0){
			setPrev(randomNumber - 1)
		}
		if (randomNumber == 0){
			setPrev(videoList.length - 1)
		}
  }, [randomNumber]);

	function gotoPrev() {
		setrandomNumber(prev);
	}

	function gotoNext() {
		setrandomNumber(next);
	}

	function toggle() {
		var element = document.getElementById("toggle");
		element?.classList.toggle("active");
	}

  return (
    <Container>
			<div className='prev-button outer' onClick={gotoPrev}></div>
      <div className="grid">
				<div className='item w3 padding'>
					<div className='align-bottom flex'>
						<div className='main'>
							<p className='tag'>#{videoList[randomNumber].projectTag[0].slug}</p>
							<h2>{videoList[randomNumber].artist[0].title} «{videoList[randomNumber].projectTitle}»</h2>
						</div>
						<div className='toggle' onClick={toggle}></div>
					</div>
				</div>
				<Spacer number={3} border=""/>
				<div className='item w5 l3'>
					<div className='video-wrapper'>
						<iframe src={videoList[randomNumber]?.videoUrl}></iframe>
					</div>
					<div className='hidden-info' id='toggle'>
						<div dangerouslySetInnerHTML={{ __html: videoList[randomNumber].pageContent }}></div>
					</div>
				</div>
				<Spacer number={3} border=""/>
				<Spacer number={3} border=""/>
				<div className='w2'>
					<div className='item w2 align-top blue-bg offset'>
						<a className='read-more' href={`/artists/${videoList[randomNumber].performances[0].slug}`}>Read more</a>
					</div>
				</div>
				<Spacer number={1} border=""/>
        <Spacer number={6} border=""/>
      </div>
			<div className='next-button outer' onClick={gotoNext}></div>
    </Container>
  );
}
