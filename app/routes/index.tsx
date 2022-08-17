import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { fetchData } from '~/service/data/home';
import type { PageData } from '~/service/data/home';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = () => {
  return fetchData();
};

export default function Index() {
  const { events } = useLoaderData<PageData>();

  return (
    <Container>
      <div className="grid">
        {events.slice(0, 2).map((item, i) => {
          return (
            <div key={`news-${i}`} className="item w3">
              {item.featuredImage && (
                <img src={item.featuredImage[0].url} alt={item.title} />
              )}
              <div className="flex space-between">
                <div className="info">
                  <h4>{item.title}</h4>
                </div>
                <div className="times big">{item.date}</div>
              </div>
            </div>
          );
        })}
        {events.slice(2, 5).map((item, i) => {
          return (
            <div key={`news2-${i}`} className="item w2">
              {item.featuredImage && (
                <img src={item.featuredImage[0].url} alt={item.title} />
              )}
              <div className="flex space-between">
                <div className="info">
                  <h4>{item.title}</h4>
                </div>
                <div className="times big">{item.date}</div>
              </div>
            </div>
          );
        })}
        <Spacer />
      </div>
    </Container>
  );
}
