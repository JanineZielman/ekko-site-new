import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import React, { useEffect } from 'react';

import Moment from 'moment';

import { fetchRecentEvents } from '~/service/data/home';
import type { RecentEvents } from '~/service/data/home';

import { fetchRecentNews } from '~/service/data/news';
import type { RecentNews } from '~/service/data/news';

import { fetchContentPage } from '~/service/data/contentPage';
import type { PageEntry } from '~/service/data/contentPage';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = async () => {
  const [recent, home, news] = await Promise.all([
    fetchRecentEvents(),
    fetchContentPage('homepage'),
    fetchRecentNews(),
  ]);

  return { recent, home, news };
};

export default function Index() {
  const { recent, home, news } = useLoaderData<{ recent: RecentEvents; home: PageEntry; news: RecentNews }>();

  // useEffect(() => {
  //   jQuery(function($) {
  //     $('#float').mouseover(function() {
  //         var dWidth = $(document).width() || 900 - 500, // 100 = image width
  //             dHeight = $(document).height() || 900, // 100 = image height
  //             nextX = Math.floor(Math.random() * dWidth),
  //             nextY = Math.floor(Math.random() * dHeight);
  //         $(this).animate({ left: nextX + 'px', top: nextY + 'px' }, 10000);
  //     });
  //   });
  // }, []);


  return (
    <Container>
      <div className='outer'>
        <div className="floating-img" id="float">
          <div className='img'></div>
        </div>
      </div>
      <div className="grid">
        <div className='outer outer-text w6 margin-top'>
          <p>Upcoming events</p>
        </div>
        {recent?.events?.map((item, i) => {
          return (
            <Link to={`/${item.type}/${item.slug}`} key={`news-${i}`} className="item w3">
              {item.featuredImage && (
                <div className='img-wrapper'><img src={item.featuredImage[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} /></div>
              )}
              <div className="flex space-between info-block">
                {item.dateEnd && <div className="times big">{Moment(item.date).format('D.MM.')} - {Moment(item.dateEnd).format('D.MM.')}</div>}
                <div className="info">
                  <h3>{item.title}</h3>
                </div>
                {item.dateEnd == null && <div className="times big">{Moment(item.date).format('D.MM.')}</div>}
              </div>
            </Link>
          );
        })}

        <div className='w1 item overflow-visible'>
          <div className='announcement outer'>
            <div className="marquee__inner" aria-hidden="true">
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
              <div dangerouslySetInnerHTML={{ __html: home.entry?.content }} />
            </div>
          </div>
        </div>

        <Spacer number={5} border=""/>


         <div className='outer outer-text w6'>
          <p>Performances</p>
        </div>

        {recent?.events[0]?.performances?.slice(0,3)?.map((item, i) => {
          return (
            <Link to={`/${recent.events[0].type}/${recent.events[0].slug}/${item.slug}`} key={`news2-${i}`} className="item w2">
              {item.artist[0].featuredImage && (
                <div className='img-wrapper'>
                  {item.artist[0].featuredImage[0].url ?
                    <img src={item.artist[0].featuredImage[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} />
                    :
                    <img className="artist" src={recent?.events[0].featuredImage[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} />
                  }
                </div>
              )}
              <div className="flex space-between info-block">
                <div className="info">
                  <h3>{item.artist[0].title}</h3>
                </div>
                <div className="times big">{Moment(item.date).format('D.MM.')}</div>
              </div>
            </Link>
          );
        })}



        {recent?.events[1]?.performances?.slice(0,3)?.map((item, i) => {
          return (
            <Link to={`/${recent.events[1].type}/${recent.events[1].slug}/${item.slug}`} key={`news2-${i}`} className="item w2">
              {item.artist[0].featuredImage && (
                <div className='img-wrapper'>
                  {item.artist[0].featuredImage[0]?.url ?
                    <img src={item.artist[0].featuredImage[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} />
                  :
                    <img className="artist" src={recent?.events[1].featuredImage[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} />
                  }
                </div>
              )}
              <div className="flex space-between info-block">
                <div className="info">
                  <h3>{item.artist[0].title}</h3>
                </div>
                <div className="times big">{Moment(item.date).format('D.MM.')}</div>
              </div>
            </Link>
          );
        })}

        {recent?.events[1]?.performances.length < 3 && 
           <Spacer number={2} border=""/>
        }

        {recent?.events[1]?.performances.length < 2 && 
           <Spacer number={2} border=""/>
        }

        <Link className='item w2 button' to="/kalender">
            <div className='view-all'>View all</div>
        </Link>

        <Spacer number={4} border=""/>

        {news?.events.length > 0 &&
          <>
            <div className='outer outer-text w6'>
              <p>Latest news</p>
            </div>

            {news?.events?.slice(0,4).map((item, i) => {
              return (
                <Link to={`/news/${item.slug}`} key={`news-${i}`} className="item w3 artist">
                  {item.newsPhoto[0] ? 
                    <div className='img-wrapper'><img src={item.newsPhoto[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} /></div>
                    : <div className='img-wrapper'><img src={item.pagePhoto[0]?.url?.replace('https://ekko.no', 'https://api.ekko.no')} alt={item.title} /></div>
                  }
                  <div className="flex space-between info-block">
                    <h3>{item.title}</h3>
                  </div>
                </Link>
              );
            })}

            <Spacer number={4} border=""/>

            <Link className='item w2 button' to="/news">
                <div className='view-all'>View all</div>
            </Link>
          </>
        }

        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
