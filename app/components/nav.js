export default function Nav({ navigation }) {
  return (
		<div className="navbar">
			<div className="homebutton">
				<a href="/">
					<img src="/homebutton.png"/>
				</a>
			</div>
			<div className="nav-items center">
				{navigation.map((item, i) => {
					return(
						item.title && <a href={item.url}><span>{item.title}</span></a>
					)
				})}
			</div>
			<div className="language">
				<a>NB</a>/ <a>EN</a>
			</div>
		</div>
  );
}
