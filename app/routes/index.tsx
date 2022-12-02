import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

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
              <div className="info-block">
                <div className="info">
                  {item.dateEnd && item.isMultiDay && <h3>{Moment(item.date).format('D.MM.')} - {Moment(item.dateEnd).format('D.MM.')}</h3>}
                  { ((item.dateEnd == null && item.isMultiDay == false) || (item.isMultiDay == false) ) && <h3>{Moment(item.date).format('D.MM.')}</h3>}
                </div>
                 <h1>{item.title}</h1>
              </div>
              {/* {item.ticketLink &&
                <div className='tickets-small'>
                  <a href={item.ticketLink} target="_blank">Tickets</a>
                </div>
              } */}
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
              <div className="info-block">
                <div className="info">
                  <h3>{Moment(item.date).format('D.MM.')}</h3>
                </div>
                <h1>{item.artist[0].title}</h1>
              </div>
              {/* {recent?.events[0].ticketLink &&
                <div className='tickets-small'>
                  <a href={recent?.events[0].ticketLink} target="_blank">Tickets</a>
                </div>
              } */}
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
              <div className="info-block">
                <div className="info">
                  <h3>{Moment(item.date).format('D.MM.')}</h3>
                </div>
                <h1>{item.artist[0].title}</h1>
              </div>
              {/* {recent?.events[1].ticketLink &&
                <div className='tickets-small'>
                  <a href={recent?.events[1].ticketLink} target="_blank">Tickets</a>
                </div>
              } */}
            </Link>
          );
        })}

        <div className='item w2 button'>
          <Link className='view-all' to="/kalender">View all</Link>
        </div>


        { (Number(recent?.events[1]?.performances.slice(0,3).length + recent?.events[0]?.performances.slice(0,3).length) / 3) % 1 != 0 &&
          <>
            { (Number(recent?.events[1]?.performances.slice(0,3).length + recent?.events[0]?.performances.slice(0,3).length)) % 2 == 0 ? 
              <Spacer number={4} border=""/> //even
              :
              <Spacer number={2} border=""/> //odd
            }
          </>
        }

        { (recent?.events[1]?.performances.length + recent?.events[0]?.performances.length == 1) && 
           <Spacer number={4} border=""/>
        }

        { (recent?.events[1]?.performances.length + recent?.events[0]?.performances.length == 2) && 
           <Spacer number={2} border=""/>
        }

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

            <div className='item w2 button'>
                <Link className='view-all' to="/news">View all</Link>
            </div>
          </>
        }

        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
