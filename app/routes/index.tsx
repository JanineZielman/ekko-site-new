import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getHomeData } from '~/service/data/home';

export const loader: LoaderFunction = () => {
  return getHomeData();
};

export default function Index() {
  const { data } = useLoaderData<Awaited<ReturnType<typeof getHomeData>>>();

  return (
    <ul>
      {data?.events.map(event => {
        const { performances = [], organizer } = event;
        return (
          <li key={event.id}>
            <a target="_blank" href={event.url} rel="noreferrer">
              {event.title}
            </a>
            {organizer?.length > 0 && <p>Organizer {organizer[0].title}</p>}
            {performances?.length > 0 && (
              <p>
                Performing:{' '}
                {performances?.map(({ artist }) => artist[0].title).join(', ')}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}
