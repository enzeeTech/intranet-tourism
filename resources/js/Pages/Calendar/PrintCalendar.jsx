import React from 'react';
import "./index.css";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};


const PrintCalendar = ({ events }) => {
    console.log("GG", events);
    return (
        <div className="print-container">
            <img
                    className="h-8 w-[70px] hidden lg:block"
                    src="/assets/Jomla logo red.svg"
                    alt="Jomla Logo"
                />
            <h1>Jomla! Events</h1>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>DATE & TIME</th>
                        <th>EVENT NAME</th>
                        <th>VENUE</th>
                        <th>CREATED BY</th>
                        <th>DESCRIPTION</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map(event => (
                        <tr key={event.id}>
                            <td className='w-56'>
                                {/* {new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}<br />
                                {new Date(event.start).toLocaleTimeString()} - {new Date(event.end).toLocaleTimeString()} */}
                                {formatDate(event.start)} - {formatDate(event.end)}
                                {/* {formatTime(event.start)} - {formatTime(event.end)} */}
                            </td>
                            <td>{event.title}</td>
                            <td>{event.venue}</td>
                            <td>{event.userName}</td>
                            <td>{event.description ? event.description : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PrintCalendar;
