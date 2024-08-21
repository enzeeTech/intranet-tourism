import React from 'react';
import '../css/EventItem.css';

const EventItem = ({ start_date, end_date, title }) => {
  console.log("DAADADAD", start_date);
  console.log("DAADADAD", end_date);

  

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

  const [start_monthDay, start_year] = start_date.split(','); 
  const [end_monthDay, end_year] = end_date.split(','); 
  const [start_month, start_day] = start_monthDay.trim().split(' ');
  const [end_month, end_day] = end_monthDay.trim().split(' ');
  const abbreviatedMonth = monthAbbreviations[start_month];

  return (
    <li className="event-item flex items-start justify-start">
      <div className="event-date-box">
        <div className="event-day">{start_day}</div>
        <div className="event-month">{abbreviatedMonth}</div>
      </div>
      <div className="event-details ml-14">
        <div className="event-title whitespace-nowrap overflow-hidden text-ellipsis">{title}</div>
        <div className="event-full-date">{`${start_month} ${start_day}, ${start_year}`}</div>
        <div className="event-full-date">{`${end_month} ${end_day}, ${end_year}`}</div>
        {/* <a href="#" className="more-link">More</a> */}
      </div>
    </li>
  );
};

export default EventItem;
