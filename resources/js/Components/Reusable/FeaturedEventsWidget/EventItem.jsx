import React from 'react';
import '../css/EventItem.css';

const EventItem = ({ date, title }) => {
  const [monthDay, year, time] = date.split(','); 
  const month = monthDay.split(' ')[0]; 
  const day = monthDay.split(' ')[1];

  return (
    <li className="event-item">
      <div className="event-date-box">
        <div className="event-day">{day}</div>
        <div className="event-month">{month.toUpperCase()}</div>
      </div>
      <div className="event-details">
        <div className="event-title">{title}</div>
        <div className="event-full-date">{`${month} ${day}, ${year}, ${time}`}</div>
        <a href="#" className="more-link">More</a>
      </div>
    </li>
  );
};

export default EventItem;
