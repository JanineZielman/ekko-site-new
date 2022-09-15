import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import React, { useEffect } from 'react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import { fetchContentPage } from '~/service/data/contentPage';
import type { PageEntry } from '~/service/data/contentPage';

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
          $(this).animate({ left: nextX + 'px', top: nextY + 'px' });
      });
    });
  }, []);

  return (
    <Container>
      <div className='outer'>
        <img className="floating-img about" id="float" src="/EKKO-logo-LITEN.png" alt="" />
      </div>
      <div className="grid">
        <div className="item w6 l2 flex">
          <div className='w2'>
            <h1>{entry.title}</h1>
            <h3 dangerouslySetInnerHTML={{ __html: entry?.contact }} />
          </div>
          <div className="w4">
            <div className='header-img'>
              <img src={entry.photo?.[0].url} alt={entry.title} />
            </div>
          </div>
        </div>
        <Spacer number={6} border="" />
        <div className='item w3 l3'>
          {/* Need to do this to output rich text content */}
          <div dangerouslySetInnerHTML={{ __html: entry?.content }} />
        </div>
        <Spacer number={9} border=""/>
        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
