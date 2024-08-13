import React from 'react';
import '../css/EventItem.css';

const EventItem = ({ date, title }) => {

  const monthAbbreviations = {
    January: 'JAN',
    February: 'FEB',
    March: 'MAR',
    April: 'APR',
    May: 'MAY',
    June: 'JUN',
    July: 'JUL',
    August: 'AUG',
    September: 'SEP',
    October: 'OCT',
    November: 'NOV',
    December: 'DEC',
  };

  const [monthDay, year, time] = date.split(','); 
  const [month, day] = monthDay.trim().split(' ');
  const abbreviatedMonth = monthAbbreviations[month];

  return (
    <li className="event-item flex items-start justify-start">
      <div className="event-date-box">
        <div className="event-day">{day}</div>
        <div className="event-month">{abbreviatedMonth}</div>
      </div>
      <div className="event-details ml-14">
        <div className="event-title whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        <div className="event-full-date">{`${month} ${day}, ${year}`}</div>
        {/* <a href="#" className="more-link">More</a> */}
      </div>
    </li>
  );
};

export default EventItem;
