import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Calendar/index.css";

import searchIcon from '../../../public/assets/search.png';
import searchButton from '../../../public/assets/searchButton.png';

function Calendar () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDateSelect = (info) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
      <h1 className="mb-2 font-sans text-4xl font-bold text-left" >Calendar</h1>
      <hr className="mx-auto" style={{ borderColor: '#E4E4E4', borderWidth: '2px' }} />

      <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4' }}>
        <div className="flex items-center" style={{ width: '100%' }}>
          {/* Icon */}
          <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
            <img src={searchIcon} alt="Search" className="w-10 h-10" />
          </span>

          {/* Search Input */}
          <input
            type="search"
            className="flex-grow px-4 py-2 border-none rounded-none"
            placeholder="Search for events"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ outline: 'none' }}
          />

          {/* Find Events Button */}
          <button className="flex items-center justify-center px-6 py-2">
            <img src={searchButton} alt="Find Events" className="w-30 h-11" />
          </button>
        </div>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        selectHelper={true}
        select={handleDateSelect}
        headerToolbar={{
          start: 'prev,next today printButton',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay,list',
        }}
        height={650}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
        }}
        events={[
          {
            title: 'Standup Meeting Tourism',
            start: '2024-04-04T11:00',
            end: '2024-04-04T12:00',
            color: 'black',
          },
        ]}
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
        customButtons={{
          printButton: {
            text: ' ',
            click: function() {
              alert('Clicked the custom button!');
              // Add your custom button logic here
            },
          }
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
          <input type="text" className="form-control" />
          <button>Confirm</button>
        </div>
      )}
      </div>
  );
}

export default Calendar;
