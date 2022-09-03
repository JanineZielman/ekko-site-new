import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchRecentEvents } from '~/service/data/home';
import type { RecentEvents } from '~/service/data/home';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = () => {
  return fetchRecentEvents();
};

export default function Index() {
  const { events } = useLoaderData<RecentEvents>();

  return (
    <Container>
      <div className="grid">
        {events.slice(0, 2).map((item, i) => {
          return (
            <Link to={`/${item.type}/${item.slug}`} key={`news-${i}`} className="item w3">
              {item.featuredImage && (
                <div className='img-wrapper'><img src={item.featuredImage[0].url} alt={item.title} /></div>
              )}
              <div className="flex space-between">
                <div className="info">
                  <h3>{item.title}</h3>
                </div>
                <div className="times big">{item.date}</div>
              </div>
            </Link>
          );
        })}
        {events.slice(2, 5).map((item, i) => {
          return (
            <Link to={`/${item.type}/${item.slug}`} key={`news2-${i}`} className="item w2">
              {item.featuredImage && (
                <div className='img-wrapper'><img src={item.featuredImage[0].url} alt={item.title} /></div>
              )}
              <div className="flex space-between">
                <div className="info">
                  <h4>{item.title}</h4>
                </div>
                <div className="times big">{item.date}</div>
              </div>
            </Link>
          );
        })}
        <Spacer number={6} border=""/>
      </div>
    </Container>
  );
}
