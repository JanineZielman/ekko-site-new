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
					{/* event block */}
					<Link to={`/${item.type}/${item.slug}`} key={`event-${i}`} className={`item w6 overflow-visible kalender-item`}>
						<p className={`outer month`} id={`m-${Moment(item.date).format("MM")}`}>{Moment(item.date).format("MMMM")}</p>
						<div className="img">
							{item.featuredImage && (
								<img src={item.featuredImage[0]?.url} alt={item.title} />
							)}
						</div>
						<div className="text">
							<div className='text-wrapper'>
								<h2>{Moment(item.date).format("D.M.")} {item.dateEnd && item.isMultiDay && `- ${Moment(item.dateEnd).format("D.M.")}`}</h2>
								<h1 className='underline'>{item.title}</h1>
								<div className='flex space-between'>
									<div className='event-details'>
									{item.openingTime && 
										<p><span>Time:</span> {Moment(item.openingTime).format("HH:mm")}  {item.closingTime && <>- {Moment(item.closingTime).format("HH:mm")} </>}</p>
									}
									{item.location?.[0] &&
										<p><span>Place: </span> {item.location[0]?.title}{item.location[1]?.title && `, ${item.location[1]?.title}`}</p>
									}
								</div>
									{item.ticketLink &&
										<div className='tickets-small'>
											<a href={item.ticketLink} target="_blank">Tickets</a>
										</div>
									}
								</div>
								

							</div>
						</div>
					</Link>
					{/* perfomance blocks */}
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
										<h1 className='underline'>
											{performance.artist[0].title ? 
												performance.artist[0].title
											: performance.title
											}
										</h1>
										{performance.date &&
											<p><span>Date: {Moment(performance.date).format("ddd DD. MMMM")}</span></p>
										}
										{performance.time && 
											<p> <span>Time:</span> {Moment(performance.time).format('HH:mm')}  {performance.timeEnd && <>- {Moment(performance.timeEnd).format('HH:mm')} </>}</p>
										}
										{performance.location?.[0] && 
											<p><span>Place: </span> {performance.location[0]?.title}{performance.location[1]?.title && `, ${performance.location[1]?.title}`}</p>
										}
									</div>
								</div>
							</Link>
						)
					})}

					{ item.performances.length % 2 == 0 ? 
						<Spacer number={6} border=""/> //even
						:
						<Spacer number={3} border=""/> //odd
					}

				</>
			);
		})}
	</>
  );
}
