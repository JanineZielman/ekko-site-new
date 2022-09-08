import type { Navigation } from '~/service/data/global';
import { Link } from '@remix-run/react';

export default function Nav({ navigation }: { navigation: Navigation }) {
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
                  <a key={`navlink-${i}`} href={item.url}>
                    <span>{item.title}</span>
                  </a>
                )
              );
            })}
        </div>
        <div className="language">
          <a>NB</a>/ <a>EN</a>
        </div>
        <Link className='search-icon' to="/search"></Link>
      </div>
    </>
  );
}
