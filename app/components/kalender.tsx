import { Link} from '@remix-run/react';
import Moment from 'moment';
import React, { useEffect } from 'react';

import Spacer from '~/components/spacer';

export default function Kalender({filteredEvents}: {filteredEvents: any}) {
  return (
	<>
		{filteredEvents.reverse().map((item:any, i:any) => {
			useEffect(() => {
				var element = document.getElementById(`m-${Moment(item.date).format("MM")}`);
				if (element) {
					element.style.display = 'block';
				}
			}, []);
			
			return (
				<>
					<Link to={`/${item.type}/${item.slug}`} key={`event-${i}`} className={`item w3 overflow-visible kalender-item`}>
						<p className={`outer month`} id={`m-${Moment(item.date).format("MM")}`}>{Moment(item.date).format("MMMM")}</p>
						<div className="img">
							{item.featuredImage && (
								<img src={item.featuredImage[0]?.url} alt={item.title} />
							)}
						</div>
						<div className="text">
							<div className='text-wrapper'>
								<p>{Moment(item.date).format("D.M.yy")} {item.dateEnd && `- ${Moment(item.dateEnd).format("D.M.yy")}`}</p>
								<br/>
								<h3>{item.title}</h3>
								<p>
										{item.location?.[1] && <>{item.location[1].fullTitle},</>}
										{item.openingTime && <> {Moment(item.openingTime).format("HH:mm")}  {item.closingTime && <>- {Moment(item.closingTime).format("HH:mm")} </>}</>}
								</p>
							</div>
						</div>
					</Link>
					{item.performances.map((performance:any, j:any) => {
						return(
							<Link to={`/${item.type}/${item.slug}/${performance.slug}`} key={`performance-${j}`} className="item w3 kalender-item">
								<div className="img artist">
									{performance.artist[0].featuredImage[0] ? 
										<img src={performance.artist[0].featuredImage[0]?.url} alt={item.title} />
										: <img src={item.featuredImage[0]?.url} alt={item.title} />
									}
								</div>
								<div className="text">
									<div className='text-wrapper'>
										<p>{Moment(performance.date).format("D.M.yy")} </p>
										<br/>
										<h3>
											{performance.artist[0].title ? 
												performance.artist[0].title
											: performance.title
											}
										</h3>
										
										<p>
											{performance.location?.[1] && <>{performance.location[1].fullTitle},</>}
											{performance.time && <> {Moment(performance.time).format('HH:mm')}  {performance.timeEnd && <>- {Moment(performance.timeEnd).format('HH:mm')} </>}</>}
										</p>
									</div>
								</div>
							</Link>
						)
					})}
					{item.performances.length % 2 == 0 &&
						<Spacer number={3} border=""/>
					}
					<Spacer number={6} border="" />
				</>
			);
		})}
	</>
  );
}
