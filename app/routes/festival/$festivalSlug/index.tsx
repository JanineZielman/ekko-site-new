import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { fetchEvent } from '~/service/data/festival';
import type { Event } from '~/service/data/festival';
import Moment from 'moment';

import React, { useEffect } from 'react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';

export const loader: LoaderFunction = ({ params }) => {
  return fetchEvent(params.festivalSlug!);
};

export default function Index() {
  const event = useLoaderData<Event>();

  useEffect(() => {
    jQuery(function($) {
      $('#float').mouseover(function() {
          var dWidth = $(document).width() || 900 - 500, // 100 = image width
              dHeight = $(document).height() || 900, // 100 = image height
              nextX = Math.floor(Math.random() * dWidth),
              nextY = Math.floor(Math.random() * dHeight);
          $(this).animate({ left: nextX + 'px', top: nextY + 'px' }, 10000);
      });
    });
  }, []);

  const randomNumber = Math.floor(Math.random() * (event.performances.length - 4));

  return (
    <Container>
      <div className='outer'>
        <img className="floating-img festival-icon" id="float" src="/EKKO-XIX-FBBanner.png" alt="" />
      </div>
			<div className="grid">
				<div className='item w4 l4'>
					<div className='w6 w-smaller'>
						<div className='img-wrapper black-bg'><img src={event.featuredImage[0].url}/></div>
						<div className="flex space-between white-bg">
							<div className="info">
								<h4>{event.title}</h4>
								<p>{Moment(event.date).format('D MMM')} - {Moment(event.dateEnd).format('D MMM')}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='w2 l4 mobile-w6'>
					<div className='item w2'>
            {event.relatedLinks.map((link, i) => {
              return(
                <div className='big times'><a href={`${link.linkUrl}`}>{link.linkTitle}</a></div>
              )
            })}
					</div>
					<div className='item w2 no-border'>
						<h3>{event.title}</h3>
						<div dangerouslySetInnerHTML={{ __html: event.intro }}></div>
						<div dangerouslySetInnerHTML={{ __html: event.lineup }}></div>
					</div>
				</div>
        <div className='outer outer-text w6'>
          <p>Performances</p>
        </div>
				<div className='item w4 l4 inner'>
					{event.performances.slice(randomNumber, (randomNumber + 4)).map((item, i) => {
						return(
							<Link to={`${item.slug}`} className='w3 l2'>
								<div className='img-wrapper'><img src={item.artist[0].featuredImage[0].url}/></div>
								<div className="flex space-between white-bg">
									<div className="info">
										<h4>{item.artist[0].title}</h4>
										<p>{item.time}, {item.location[0].title}</p>
									</div>
									<div className="times big">{Moment(item.date).format('D/MM')}</div>
								</div>
							</Link>
						)
					})}
				</div>
				<Spacer number={8} border=""/>
        <div className='outer outer-text w6'>
          <p>{event.relatedLinks[0].linkTitle}</p>
        </div>
        <div className='item w2 white-bg align-bottom offset'>
          <div className='times big'>{event.relatedLinks[0].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        <div className='item w4 l2' id={event.relatedLinks[0].linkUrl.replace('#', '')}>
          <div className='columns w6'>
            {event.performances.map((item, i) => {
              return(
                <Link to={`${item.slug}`}>
                  <p>{item.artist[0].title}</p>
                </Link>
              )
            })}
          </div>
        </div>
        <Spacer number={4} border=""/>

        <div className='outer outer-text w6'>
          <p>{event.relatedLinks[1].linkTitle}</p>
        </div>

        <div className='item w2 white-bg align-bottom offset' id={event.relatedLinks[1].linkUrl.replace('#', '')}>
          <div className='times big'>{event.relatedLinks[1].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        {event.program.map((item, i) => {
          return(
            <div className='item w3'>
              <div className='white-bg no-padding'>
                <h4>{Moment(item.date).format('ddd D. MMMM')}</h4>
              </div>
              <br/>
              {event.performances.map((performance, i) => {
                return(
                  <>
                    {item.date == performance.date &&
                      <Link to={`${performance.slug}`} className='program-day'>
                        <p className='underline'>{performance.location[0].title}</p>
                        <h4>{performance.time} {performance.artist[0].title}</h4>
                      </Link>
                    }
                  </>
                )
              })}
            </div>
          )
        })}
        {event.program.length % 2 != 0 &&
          <Spacer number={3} border=""/>
        }
        <Spacer number={6} border=""/>
        <div className='outer outer-text w6'>
          <p>{event.relatedLinks[2].linkTitle}</p>
        </div>
        <Spacer number={2} border=""/>
        <div className='item w4 offset' id={event.relatedLinks[2].linkUrl.replace('#', '')}>
          <div className='w2'>
            <div className='times big'>{event.relatedLinks[2].linkTitle}</div>
            <div><br/></div>
          </div>
         
          {event.tickets.map((ticket, i) => {
            return(
              <a className='item w6 white-bg ticket' href={`${ticket.ticketLink}`} target="_blank">
                <h4>{ticket.description}</h4>
                <p>{ticket.price} Kr</p>
              </a>
            )
          })}
        </div>
        <Spacer number={6} border=""/>
			</div>
		</Container>
  );
}
