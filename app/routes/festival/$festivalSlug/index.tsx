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

  event.performances.sort(({ time: a }, { time: b }) => parseInt(Moment(a).utcOffset('+0700').format("HH:mm").replace(/:/g, '')) - parseInt(Moment(b).utcOffset('+0700').format("HH:mm").replace(/:/g, '')))

  var locations: any[] = [];

  $.each(event.performances, function(i, el){
    if($.inArray(`${el.location[1]?.title ? el.location[1]?.title : el.location[0]?.title}`, locations) === -1) locations.push(`${el.location[1]?.title ? el.location[1]?.title : el.location[0]?.title}`);
  });

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

  return (
    <Container>
      <div className='outer'>
        <img className="floating-img festival-icon" id="float" src="/EKKO-XIX-FBBanner.png" alt="" />
      </div>
			<div className="grid">
        <div className='item w3 g-el-wrapper'>
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
        <div className='item w2 g-el-wrapper'>
          <img src="/EKKO-webelements4.png" className='g-el'/>
        </div>

        <Spacer number={6} border=""/>

        <div className='item w2 align-bottom'>
          <div className='times big white-bg border-top'>{event.relatedLinks[0].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        <div className='item w6 l2 more-padding' id={event.relatedLinks[0].linkUrl.replace('#', '')}>
          <div className='columns w6'>
            {event.performances.map((item, i) => {
              return(
                <Link to={`artist/${item.slug}`}>
                  <p>{item.artist[0].title}</p>
                </Link>
              )
            })}
          </div>
        </div>
        <Spacer number={6} border=""/>

        <div className='item w2 align-bottom' id={event.relatedLinks[1].linkUrl.replace('#', '')}>
          <div className='times big white-bg border-top'>{event.relatedLinks[1].linkTitle}</div>
        </div>
        <Spacer number={4} border=""/>
        {event.program.map((item, i) => {
          return(
            <div className='item w3 padding'>
              <div className='white-bg no-padding'>
                <Link to={Moment(item.date).format('YYYY-MM-DD')}><h4>{Moment(item.date).format('ddd D. MMMM')}</h4></Link>
              </div>
              <br/>
              {locations.map((location, i) => {
                const filteredEvents = event.performances.filter(performance => performance.location[1]?.title == location || performance.location[0]?.title == location);
                const filteredPerformance = filteredEvents.filter(performance => performance.date == item.date);
                return(
                  <div className='program-location-item'>
                    {filteredPerformance.length > 0 &&
                      <p>{filteredPerformance[0].location[0].title} {filteredPerformance[0].location[1] && `, ${filteredPerformance[0].location[1]?.title}`}</p>
                    }
                    {filteredEvents.map((performance, i) => {
                      return(
                        <>
                          {item.date == performance.date && 
                            <Link to={`artist/${performance.slug}`} className='program-day'>
                              <h4 className='underline'>{Moment(performance.time).utcOffset('+0100').format("HH:mm")}, {performance.artist[0].title}</h4>
                            </Link>
                          }
                        </>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}

        <Spacer number={6} border=""/>

        {event.program.length % 2 != 0 &&
          <Spacer number={3} border=""/>
        }

        <Spacer number={2} border=""/>
          <div className='item w2 align-bottom'>
            <div className='times big white-bg border-top'>{event.relatedLinks[2].linkTitle}</div>
          </div>
           <Spacer number={4} border=""/>
        <div className='item w4' id={event.relatedLinks[2].linkUrl.replace('#', '')}>         
          {event.tickets.map((ticket, i) => {
            return(
              <a className='ticket' href={`${ticket.ticketLink}`} target="_blank">
                <h3>{ticket.description}</h3>
                <p className='price-label'>{ticket.price} Kr</p>
              </a>
            )
          })}
        </div>

        <Spacer number={6} border=""/>

        {event.sections.map((section, i) => {
          return(
            <div className='item w3 padding' id={section.sectionId}>
              <h1>{section.sectionTitle}</h1>
              <div dangerouslySetInnerHTML={{ __html: section.sectionBody }} />
            </div>
          )
        })}
        
        <Spacer number={6} border=""/>
			</div>
		</Container>
  );
}
