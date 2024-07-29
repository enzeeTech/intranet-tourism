import React from 'react';
import "./index.css";


const PrintCalendar = ({ events }) => {
    return (
        <div className="print-container">
            <h1>Calendar Events</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <p><strong>Venue:</strong> {event.venue}</p>
                        <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
                        <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrintCalendar;
