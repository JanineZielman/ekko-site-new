import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import styles from '~/styles/global.css';
import Footer from './components/footer';
import Nav from './components/nav';
import type { Navigation } from './service/data/global';
import { getNavigation } from './service/data/global';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const loader: LoaderFunction = () => {
  return getNavigation();
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Ekko',
  viewport: 'width=device-width,initial-scale=1',
});

export default function App() {
  const navigation = useLoaderData<Navigation>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Nav navigation={navigation} />
        <main>
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
