import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Link} from '@remix-run/react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import Moment from 'moment';

import { fetchContentPage } from '~/service/data/contentPage';
import type { PageEntry } from '~/service/data/contentPage';
import { fetchAllEvents } from '~/service/data/events';
import type { AllEvents } from '~/service/data/events';


export const loader: LoaderFunction = async() => {
  // return fetchContentPage('archive');
	const [page, events] = await Promise.all([
   	fetchContentPage('archive'),
    fetchAllEvents(),
  ]);

	return { page, events };
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as PageEntry).entry?.title,
});

export default function Archive() {
	const { page, events } = useLoaderData<{ page: PageEntry; events: AllEvents }>();

  return (
    <Container>
      <div className="grid" id="contact">
				<div className='item w6 padding'><h1>{page.entry.pageTitle}</h1></div>
				{events.events.map((event, j) => {
					return(
						<div className={`item ${event.type == 'festival' ? `w6 blue-bg festival-item` : `w2 white-bg normal-item`}`}>
							<p className='date'>{Moment(event.date).format("D.M.yy")} {event.dateEnd && `- ${Moment(event.dateEnd).format("D.M.yy")}`}</p>
							<h2><Link to={`/${event.type}/${event.slug}`}>{event.title}</Link></h2>
							<div className='artists'>
								{event.performances.map((performance, j) => {
									return(
										<Link to={`/${event.type}/${event.slug}/${event.type == 'festival' ? 'artist/' : ''}${performance.slug}`} key={`artist-${j}`} className="artist">{performance.artist[0].title}</Link>
									)
								})}
							</div>
						</div>
					)
				})}
       	{page.entry.pastEvents.map((item, i) => {
					const artists = item.artists.split(/\r?\n/)
					return(
						<div className={`item ${item.isFestival ? `w6 blue-bg festival-item` : `w2 white-bg normal-item`}`}>
							<p className='date'>{Moment(item.date).format("D.M.yy")} {item.dateEnd && `- ${Moment(item.dateEnd).format("D.M.yy")}`}</p>
							<h2>{item.eventTitle}</h2>
							<div className='artists'>
								{artists.map((artist, j) => {
									return(
										<p key={`artist-${j}`} className="artist">{artist}</p>
									)
								})}
							</div>
						</div>
					)
				})}
      </div>
    </Container>
  );
}
