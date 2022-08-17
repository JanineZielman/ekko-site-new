import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import Container from '~/components/container';
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

  return (
    <Container>
      <div className="grid">
        <h1>{entry.title}</h1>
        <img src={entry.photo?.[0].url} alt={entry.title} />
        {/* Need to do this to output rich text content */}
        <div dangerouslySetInnerHTML={{ __html: entry?.content }} />
      </div>
    </Container>
  );
}
