import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import searchIcon from '../../../public/assets/search.png';
import searchButton from '../../../public/assets/searchButton.png';
import printIcon from '../../../public/assets/printButton.png';
import * as bootstrap from "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar/index.css";
// import Example from '@/Layouts/DashboardLayoutNew';
import Example from '@/Layouts/DashboardLayoutNew';
import PageTitle from '@/Components/Reusable/PageTitle';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({ title: '', start_at: '', end_at: '', color: 'purple' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('/api/crud/events')
            .then(response => {
                console.log(response.data.data.data);
                setEvents(response.data.data.data);
            })
            .catch(error => {
                console.error('Error fetching events: ', error);
            });
    };

    const handleDateSelect = (info) => {
        setIsModalOpen(true);
        setEventData({ ...eventData, start_at: info.startStr, end_at: info.endStr });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventData({ title: '', start_at: '', end_at: '', color: 'purple' });
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/crud/events', eventData)
            .then(response => {
                setEvents([...events, eventData]);
                closeModal();
            })
            .catch(error => {
                console.error('Error creating event: ', error);
            });
    };

    return (
      <Example>
        {/* <main className="xl:pl-[calc(25%+4rem)] xl:pr-[calc(25%+2rem)]">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center"> */}
      <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
      <h1 className="mb-2 font-sans text-4xl font-bold text-left" >Calendar</h1>
      <hr className="mx-auto" style={{ borderColor: '#E4E4E4', borderWidth: '2px' }} />

      <div className="flex justify-center mt-3 mb-4">
        <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4', width: '90%' }}>
          <div className="flex items-center" style={{ width: '100%' }}>
            {/* Icon */}
            <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
              <img src={searchIcon} alt="Search" className="w-10 h-10" />
            </span>

            {/* Search Input */}
            <input
              type="search"
              className="flex-grow px-4 py-2 border-none input-no-outline"
              placeholder="Search for events"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ outline: 'none' }}
            />

            {/* Find Events Button */}
            <button
              onClick={() => { alert('Clicked the find events button!')}}
              className="flex items-center justify-center py-2 mr-2">
              <img src={searchButton} alt="Find Events" className="w-30 h-11" />
            </button>
          </div>
        </div>
        {/* Print Button - Adjust the styling as needed */}
        <button
          onClick={() => { alert('Clicked the print button!')}}
          className="flex items-center justify-center mb-3">
          <img src={printIcon} alt="Print" className="w-30 h-30" />
        </button>
      </div>

        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectHelper={true}
            select={handleDateSelect}
            headerToolbar={{
                start: 'prev,next today',
                center: 'title',
                end: 'dayGridYear,dayGridMonth,timeGridDay',
            }}
            height={650}
            buttonText={{
                today: 'Today',
                year: 'Year',
                month: 'Month',
                day: 'Day',
            }}
            events={events}
            eventDidMount={(info) => {
              return new bootstrap.Popover(info.el, {
                title: info.event.title,
                placement: "auto",
                trigger: "hover",
                customClass: "popoverStyle",
                content:
                  "<p>Come to Oval Room</p>",
                html: true,
              });
            }}
        />


        {isModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              padding: '20px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              zIndex: '1050',
            }}
          >
          <button
            onClick={closeModal}
            style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
            }}
          >
          X
          </button>
          <h4>Create Event</h4>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Event Title"
                  required
              />
              <input
                  type="datetime-local"
                  name="start"
                  value={eventData.start}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Start Date and Time"
                  required
              />
              <input
                  type="datetime-local"
                  name="end"
                  value={eventData.end}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="End Date and Time"
                  required
              />
              <button type="submit">Confirm</button>
          </form>
          </div>
        )}
      </div>
      {/* </div>
      </main> */}

      </Example>
    );
}

export default Calendar;
