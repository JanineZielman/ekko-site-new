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
import { useLocation } from '@remix-run/react'
import React, { useState, useEffect } from 'react';

import styles from '~/styles/global.css';
import breakpoints from '~/styles/breakpoints.css';
import kalender from '~/styles/kalender.css';
import Footer from './components/footer';
import Nav from './components/nav';
import Menu from './components/menu';
import type { Navigation } from './service/data/global';
import { getNavigation } from './service/data/global';

export function links() {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: breakpoints},
    {rel: 'stylesheet', href: kalender}
  ];
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

  let location = useLocation();
  var slug = location.pathname.slice(1).split("/");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  },[]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <Links />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      </head>
      <body className={`${slug[0]}`}>
        <Nav navigation={navigation} />
        <Menu navigation={navigation}/>
        <main>
          {loading ?
            <div className="loader"></div>
          :
            <Outlet />
          }
        </main>
        <Footer navigation={navigation} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
