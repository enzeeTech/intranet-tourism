import React from 'react';
import EventItem from './EventItem';
import '../css/FeaturedEvents.css';
import arrowRight from '../../../../../public/assets/viewAllArrow.png';

const featuredEvents = [
  // This array should be fetched from your backend or passed as props
  { id: 1, date: 'January 19,2024,12:30 PM', title: 'Conference' },
  { id: 2, date: 'January 21,2024,08:00 AM', title: 'Corporate event' },
  { id: 3, date: 'February 12,2024,07:00 PM', title: 'Exhibition' },
];

const FeaturedEvents = () => {
  return (
    <div className="featured-events-container border-2 shadow-2xl">
      <h2 style={{fontWeight: 'bold', fontSize: '24px', marginBottom: '4px'}}>Featured Events</h2>
      <hr className="underline" />
      <ul className="featured-events-list">
        {featuredEvents.map((event) => (
          <React.Fragment key={event.id}>
            <EventItem {...event} />
            <hr className="event-separator" />
          </React.Fragment>
        ))}
      </ul>
      <button className="view-all-btn">
        VIEW ALL
        <img src={arrowRight} alt="Arrow right" className="arrow-icon" />
      </button>
    </div>
  );
};

export default FeaturedEvents;
