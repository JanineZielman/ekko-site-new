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

  useEffect(() => {
    jQuery(function($) {
      $('#float').mouseover(function() {
          var dWidth = $(document).width() || 900 - 500, // 100 = image width
              dHeight = $(document).height() || 900, // 100 = image height
              nextX = Math.floor(Math.random() * dWidth),
              nextY = Math.floor(Math.random() * dHeight);
          $(this).animate({ left: nextX + 'px', top: nextY + 'px' }, 10000);
      });
    });
  }, []);

  return (
    <Container>
      <div className='outer'>
        <img className="floating-img about" id="float" src="/EKKO-logo-LITEN.png" alt="" />
      </div>
      <div className="grid" id="contact">
        <div className="item w2 padding">
            <h1 className='padding-left'>{entry.title}</h1>
            <h3 className='padding-left' dangerouslySetInnerHTML={{ __html: entry?.contact }} />
        </div>
        <div className="item w4">
          <div className='full-img-wrapper'>
            <img src={entry.photo?.[0].url} alt={entry.title} />
          </div>
        </div>
        <div className='item w4 l1 padding'>
           <div dangerouslySetInnerHTML={{ __html: entry?.content }} />
        </div>
        <div className='item w2 l1'>
          <Link to="/archive" className='archive-button'><h2>Archive</h2></Link>
        </div>
        <Spacer number={6} border=""/>
        <ImageGallery entry={entry}/>
      </div>
    </Container>
  );
}
