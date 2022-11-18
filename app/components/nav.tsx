import type { Navigation } from '~/service/data/global';
import { Link } from '@remix-run/react';
import { useLocation } from '@remix-run/react'


export default function Nav({ navigation }: { navigation: Navigation }) {
  const location = useLocation()
  var slug = location.pathname.slice(1).split("/")?.[0];

  return (
    <>
      <div className='nav-space'></div>
      <div className="navbar hide-for-mobile">
        <a href="/" className="homebutton"></a>
        <div className="nav-items center">
          {navigation &&
            navigation.nodes.map((item, i) => {
              return (
                item.title && (
                  <a key={`navlink-${i}`} href={item.url} className={slug == item.url.replace('/', '') ? 'active' : ''}>
                    <span>{item.title}</span>
                  </a>
                )
              );
            })}
        </div>
        <Link className='search-icon' to="/search"></Link>
      </div>
    </>
  );
}
