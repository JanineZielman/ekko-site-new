import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Link } from '@remix-run/react';

import Container from '~/components/container';
import Spacer from '~/components/spacer';
import ImageGallery from '~/components/imagegallery'
import Kalender from '~/components/kalender';

import { fetchContentPage } from '~/service/data/contentPage';
import type { PageEntry } from '~/service/data/contentPage';
import { fetchAllEvents } from '~/service/data/events';
import type { AllEvents } from '~/service/data/events';


export const loader: LoaderFunction = async() => {
  let [entry, events] = await Promise.all([
    fetchContentPage('ostre'),
    fetchAllEvents(),
  ]);

  let filteredEvents1 = [];
  let filteredEvents = [];
  var currentTime = new Date();

  filteredEvents1 = events.events.filter((item: any) => {
    var itemDate = new Date(item.date);
    itemDate.setDate(itemDate.getDate() + 2);
    return itemDate.getTime() >= currentTime.getTime();
  });


  filteredEvents = filteredEvents1.filter((item: any) => {
    return item.location?.[0]?.title === 'Østre'
  });

  // return fetchContentPage('ostre');
  return { entry, filteredEvents };
};

export const meta: MetaFunction = ({ data }) => ({
  title: (data as PageEntry).entry?.title,
});

export default function Oestre() {
  const { entry, filteredEvents } = useLoaderData<{ entry: PageEntry; filteredEvents: AllEvents }>();

  return (
    <Container>
      <div className='outer'>
        <div className="floating-img oestre" id="float">
          <div className='img'></div>
        </div>
      </div>
      <div className="grid">
        <Spacer number={6} border={""}/>
        <div className='w6'><h1 className='extra-big'>{entry.entry.pageTitle}</h1></div>
        <Spacer number={6} border={""}/>
         <Spacer number={6} border={""}/>
        {entry.entry.relatedLinks.map((link, i) => {
          return(
            <Link className='item w2 padding' to={`${link.linkUrl}`}>
              <div className='times big middle'>{link.linkTitle}</div>
            </Link>
          )
        })}
                  
        <div className='outer outer-text w6'>
          <p>About</p>
        </div>

        <div className="item w3 l2">
          <div className='full-img-wrapper grey'>
            <img src={entry.entry.photo?.[0].url} alt={entry.entry.title} />
          </div>
        </div>

        <div className='item w3 l3 padding' id="About">
          <div dangerouslySetInnerHTML={{ __html: entry?.entry?.content }} />
        </div>
        <Spacer number={1} border={""}/>
    
        <div className='item w2 padding'>
          <h3 dangerouslySetInnerHTML={{ __html: entry?.entry?.contact }} />
        </div>

        <Spacer number={6} border={""}/>
        
        <div className='w2 item align-bottom' id="Kalender">
          <div className='blue-bg border-top'>
            <h2>Currently at Østre</h2>
          </div>
        </div>
        <Spacer number={4} border={""}/>
        {filteredEvents.length ?
          <Kalender filteredEvents={filteredEvents}/>
          :
          <div className='item w6'>
            <p className='white-bg'>There are no upcoming events hosted by Østre.</p>
          </div>
        }

        <Spacer number={6} border={""}/>

        <ImageGallery entry={entry.entry}/>
      </div>
    </Container>
  );
}
