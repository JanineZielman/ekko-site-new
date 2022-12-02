import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Link} from '@remix-run/react';

import React, { useEffect } from 'react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import { fetchContentPage } from '~/service/data/contentPage';
import type { PageEntry } from '~/service/data/contentPage';
import ImageGallery from '~/components/imagegallery'

export const loader: LoaderFunction = () => {
  return fetchContentPage('about');
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as PageEntry).entry?.title,
});

export default function About() {
  const { entry } = useLoaderData<PageEntry>();

  return (
    <Container>
      <div className='outer'>
        <div className="floating-img about" id="float">
          <div className='img'></div>
        </div>
      </div>
      <div className="grid" id="contact">
        <Spacer number={4} border=""/>
        <div className='item w2 l1'>
          <Link to="/archive" className='archive-button'><h2>Archive</h2></Link>
        </div>
         <div className="w6">
            <h1 className='extra-big'>{entry.pageTitle}</h1>
        </div>
        <Spacer number={6} border=""/>
        <Spacer number={6} border=""/>
        
        <div className="item w6 l2">
          <div className='full-img-wrapper'>
            <img src={entry.photo?.[0].url} alt={entry.title} />
          </div>
        </div>
       
        <div className='item w4 l2 padding'>
           <div dangerouslySetInnerHTML={{ __html: entry?.content }} />
        </div>
         <div className='w2 item align-bottom' id="Kalender">
          <div className='blue-bg border-top'>
            <h2>Contact:</h2>
          </div>
        </div>
        <div className="item w2 padding">
          <h3 dangerouslySetInnerHTML={{ __html: entry?.contact }} />
        </div>
        <Spacer number={6} border=""/>
        <ImageGallery entry={entry}/>
      </div>
    </Container>
  );
}
