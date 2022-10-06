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
        <div className='item no-border w3'>
          <img src="/EKKO-webelements2.png" className='g-el padding'/>
        </div>
       
        <Spacer number={1} border=""/>
        <div className='item w2 padding'>
          {event.relatedLinks.map((link, i) => {
            return(
              <div className='times big middle'><a href={`${link.linkUrl}`}>{link.linkTitle}</a></div>
            )
          })}
        </div>
        <Spacer number={2} border=""/>
        <div className='item w2 padding'>
          <h1 className='big'>{event.title}</h1>
          <h1 dangerouslySetInnerHTML={{ __html: event.intro }}></h1>
        </div>
        <div className='item w2'>
          <img src="/EKKO-webelements4.png" className='g-el'/>
        </div>
        
        <div className='outer outer-text w6'>
          <p>Performances</p>
        </div>
				
					{event.performances.slice(0, 2).map((item, i) => {
						return(
							<Link to={`${item.slug}`} className='item w2 l2'>
								<div className='img-wrapper'><img src={item.artist[0].featuredImage[0].url}/></div>
								<div className="flex space-between white-bg height">
									<div className="info">
										<h4>{item.artist[0].title}</h4>
										<p>{Moment(item.time).format("HH:mm")}, {item.location[0].title}</p>
									</div>
									<div className="times big">{Moment(item.date).format('D.MM.')}</div>
								</div>
							</Link>
						)
					})}
          <Spacer number={4} border=""/>

          {event.performances.slice(2, 4).map((item, i) => {
						return(
							<Link to={`${item.slug}`} className='item w2 l2'>
								<div className='img-wrapper'><img src={item.artist[0].featuredImage[0].url}/></div>
								<div className="flex space-between white-bg height">
									<div className="info">
										<h4>{item.artist[0].title}</h4>
										<p>{Moment(item.time).format("HH:mm")}, {item.location[0].title}</p>
									</div>
									<div className="times big">{Moment(item.date).format('D.MM.')}</div>
								</div>
							</Link>
						)
					})}
          <Spacer number={4} border=""/>

        <div className='item w2 white-bg align-bottom offset'>
          <div className='times big'>{event.relatedLinks[0].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        <div className='item w6 l2 more-padding' id={event.relatedLinks[0].linkUrl.replace('#', '')}>
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
        <Spacer number={6} border=""/>

        <div className='item w2 white-bg align-bottom offset' id={event.relatedLinks[1].linkUrl.replace('#', '')}>
          <div className='times big'>{event.relatedLinks[1].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        {event.program.map((item, i) => {
          return(
            <div className='item w3 padding'>
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
                        <h4>{Moment(performance.time).format("HH:mm")}, {performance.artist[0].title}</h4>
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

        <Spacer number={2} border=""/>
          <div className='item w2 white-bg align-bottom offset '>
            <div className='times big'>{event.relatedLinks[2].linkTitle}</div>
          </div>
           <Spacer number={4} border=""/>
        <div className='item w4 offset' id={event.relatedLinks[2].linkUrl.replace('#', '')}>         
          {event.tickets.map((ticket, i) => {
            return(
              <a className='item w6 ticket' href={`${ticket.ticketLink}`} target="_blank">
                <h3>{ticket.description}</h3>
                <p className='price-label'>{ticket.price} Kr</p>
              </a>
            )
          })}
        </div>
        <Spacer number={6} border=""/>
			</div>
		</Container>
  );
}
