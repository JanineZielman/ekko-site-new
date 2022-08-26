import type { Navigation } from '~/service/data/global';

export default function Nav({ navigation }: { navigation: Navigation }) {
  return (
    <div className="navbar hide-for-mobile">
      <div className="homebutton">
        <a href="/">
          <img src="/homebutton.png" alt="Home" />
        </a>
      </div>
      <div className="nav-items center">
        {navigation &&
          navigation.nodes.map((item, i) => {
            return (
              item.title && (
                <a href={item.url}>
                  <span>{item.title}</span>
                </a>
              )
            );
          })}
      </div>
      <div className="language">
        <a>NB</a>/ <a>EN</a>
      </div>
    </div>
  );
}
