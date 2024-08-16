// import React from 'react';
// import EventItem from './EventItem';
// import '../css/FeaturedEvents.css';
// import arrowRight from '../../../../../public/assets/viewAllArrow.png';

// const featuredEvents = [
//   // This array should be fetched from your backend or passed as props
//   { id: 1, date: 'January 19,2024,12:30 PM', title: 'Conference' },
//   { id: 2, date: 'January 21,2024,08:00 AM', title: 'Corporate event' },
//   { id: 3, date: 'February 12,2024,07:00 PM', title: 'Exhibition' },
// ];

// const FeaturedEvents = () => {
//   return (
//     <div className="featured-events-container border-2 shadow-custom">
//       <h2 style={{fontWeight: 'bold', fontSize: '24px', marginBottom: '4px'}}>Featured Events</h2>
//       <hr className="underline" />
//       <ul className="featured-events-list">
//         {featuredEvents.map((event) => (
//           <React.Fragment key={event.id}>
//             <EventItem {...event} />
//             <hr className="event-separator" />
//           </React.Fragment>
//         ))}
//       </ul>
//       <button className="view-all-btn">
//         VIEW ALL
//         <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
//       </button>
//     </div>
//   );
// };

// export default FeaturedEvents;



import React, { useState, useEffect } from 'react';
import EventItem from './EventItem';
import '../css/FeaturedEvents.css';
import arrowRight from '../../../../../public/assets/viewAllArrow.png';

const FeaturedEvents = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events/events');
        const data = await response.json();
        const currentDate = new Date();
        const sortedEvents = data.data.data
          .filter(event => new Date(event.start_at) >= currentDate) // Filter events starting from today
          .sort((a, b) => new Date(a.start_at) - new Date(b.start_at)); // Sort events by start date
        const upcomingEvents = sortedEvents.slice(0, 3);
        setFeaturedEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="featured-events-container border-2 shadow-custom">
      <h2 style={{fontWeight: 'bold', fontSize: '24px', marginBottom: '4px'}}>Upcoming Events</h2>
      <hr className="underline" />
      <ul className="featured-events-list text-ellipsis overflow-hidden whitespace-nowrap">
        {featuredEvents.map((event) => (
          <React.Fragment key={event.id}>
            <EventItem
              id={event.id}
              date={new Date(event.start_at).toLocaleString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric' 
              })}
              title={event.title}
            />
            <hr className="event-separator" />
          </React.Fragment>
        ))}
      </ul>
      <a href='../calendar'>
        <button className="view-all-btn">
          VIEW ALL
          <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
        </button>
      </a>
    </div>
  );
};

export default FeaturedEvents;
