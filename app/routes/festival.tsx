import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Moment from 'moment';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import { fetchContentPage } from '~/service/data/festival';
import type { PageEntry } from '~/service/data/festival';


export const loader: LoaderFunction = () => {
  return fetchContentPage()
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as PageEntry).entry?.title,
});

export default function Festival() {
  const { entry, nodes } = useLoaderData<PageEntry>();

	console.log(nodes)

  return (
		<Container>
			<div className="grid">
				<div className='item w4 l4'>
					<div className='w6 w-smaller'>
						<img src={entry.performances[0].artist[0].featuredImage[0].url}/>
						<div className="flex space-between white-bg">
							<div className="info">
								<h4>{entry.performances[0].title}</h4>
								<p>{Moment(entry.performances[0].time).format("HH:mm")}, {entry.performances[0].location[0].title}</p>
							</div>
							<div className="times big">{Moment(entry.performances[0].date).format('D/MM')}</div>
						</div>
					</div>
				</div>
				<div className='w2 l4'>
					<div className='item w2'>
						{nodes[0] &&
							nodes.map((item, i) =>{
								return(
									<>
										{item.url &&
											<div className='big times'><a href={`${item.url}`}>{item.title}</a></div>
										}
									</>
								)
							})
						}
					</div>
					<div className='item w2 no-border'>
						<h3>{entry.title}</h3>
						<div dangerouslySetInnerHTML={{ __html: entry?.intro }}></div>
						<div dangerouslySetInnerHTML={{ __html: entry?.lineup }}></div>
					</div>
				</div>
				<div className='item w4 l4'>
					{entry.performances.slice(1,5).map((item, i) => {
						return(
							<div className='w3 l2'>
								<img src={item.artist[0].featuredImage[0].url}/>
								<div className="flex space-between white-bg">
									<div className="info">
										<h4>{item.title}</h4>
										<p>{Moment(item.time).format("HH:mm")}, {item.location[0].title}</p>
									</div>
									<div className="times big">{Moment(item.date).format('D/MM')}</div>
								</div>
							</div>
						)
					})}
				</div>
				<Spacer number={8} border=""/>
				<Spacer number={6} border=""/>
			</div>
		</Container>
  );
}
