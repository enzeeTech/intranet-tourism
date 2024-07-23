import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import searchIcon from '../../../public/assets/search.png';
import PrintButton from '../../../public/assets/PrintButton.svg';
import searchButton from '../../../public/assets/searchButton.png';
import printIcon from '../../../public/assets/printButton.png';
import * as bootstrap from "bootstrap";
import "./Calendar/index.css";
import Example from '@/Layouts/DashboardLayoutNew';
import PageTitle from '@/Components/Reusable/PageTitle';
import { useCsrf } from "@/composables";


function Calendar() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({ title: '', venue: '', start: '', end: '', color: 'purple' });
    const [searchTerm, setSearchTerm] = useState('');
    const csrfToken = useCsrf();


    useEffect(() => {
        fetchEvents();
    }, []);

    // const fetchEvents = () => {
    //     fetch('/api/events/events')
    //         .then(response => response.json())
    //         .then(data => {
    //           console.log("DATA", data.data.data);
    //             setEvents(data.data.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching events: ', error);
    //         });
    // };

    const fetchEvents = () => {
      fetch('/api/events/events')
          .then(response => response.json())
          .then(data => {
              console.log("DATA", data.data.data);
              const formattedEvents = data.data.data.map(event => ({
                  id: event.id,
                  title: event.title,
                  start: event.start_at, // adjust date format if needed
                  end: event.end_at, // adjust date format if needed
                  description: event.description,
                  venue: event.venue,
                  color: event.color,
              }));
              setEvents(formattedEvents);
          })
          .catch(error => {
              console.error('Error fetching events: ', error);
          });
  };
  

    const handleDateSelect = (info) => {
        setIsModalOpen(true);
        setEventData({ title: '', venue: '', start: info.startStr, end: info.endStr, color: 'purple' });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventData({ title: '', venue: '', start: '', end: '', color: 'purple' });
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      const eventPayload = {
          title: eventData.title,
          venue: eventData.venue,
          start_at: eventData.start,
          end_at: eventData.end,
          color: eventData.color,
      };
  
      // Log the payload to ensure the correct format
      console.log("Event Payload:", eventPayload);
  
      fetch('/api/events/events', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrfToken,
          },
          body: JSON.stringify(eventPayload),
      })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then(data => {
              if (data.errors) {
                  console.error('Error creating event: ', data.errors);
                  return;
              }
              setEvents([...events, data]);
              closeModal();
          })
          .catch(error => {
              console.error('Error creating event: ', error);
          });
  };
  

    return (
        // <Example>
        //     <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
        //         <h1 className="mb-2 font-sans text-4xl font-bold text-left" >Calendar</h1>
        //         <hr className="mx-auto mt-6" style={{ borderColor: '#E4E4E4', borderWidth: '1px' }} />
        //         <div className="flex justify-center mt-3 mb-4">
        //             <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4', width: '90%' }}>
        //                 <div className="flex items-center" style={{ width: '100%' }}>
        //                     <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
        //                         <img src={searchIcon} alt="Search" className="w-6 h-6 ml-4" />
        //                     </span>
        //                     <input
        //                         type="search"
        //                         className="flex-grow px-4 py-2 border-none input-no-outline"
        //                         placeholder="Search for events"
        //                         aria-label="Search"
        //                         value={searchTerm}
        //                         onChange={(e) => setSearchTerm(e.target.value)}
        //                         style={{ outline: 'none' }}
        //                     />
        //                     <button
        //                         onClick={() => { alert('Clicked the find events button!')}}
        //                         className="flex items-center justify-center px-4 py-2 mr-2 my-2 rounded-full text-white bg-blue-500 hover:bg-blue-700">
        //                         Find Event
        //                     </button>
        //                 </div>
        //             </div>
        //             <button
        //                 onClick={() => { alert('Clicked the print button!')}}
        //                 className="flex items-center justify-center mb-3 ml-6">
        //                 <img src={PrintButton} alt="Print" className="w-12 h-12" />
        //             </button>
        //         </div>

        //         <FullCalendar
        //             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        //             initialView="dayGridMonth"
        //             selectable={true}
        //             selectHelper={true}
        //             select={handleDateSelect}
        //             headerToolbar={{
        //                 start: 'prev,next today',
        //                 center: 'title',
        //                 end: 'dayGridYear,dayGridMonth,timeGridDay',
        //             }}
        //             height={650}
        //             buttonText={{
        //                 today: 'Today',
        //                 year: 'Year',
        //                 month: 'Month',
        //                 day: 'Day',
        //             }}
        //             events={events}
        //             eventDidMount={(info) => {
        //                 return new bootstrap.Popover(info.el, {
        //                     title: info.event.title,
        //                     placement: "auto",
        //                     trigger: "hover",
        //                     customClass: "popoverStyle",
        //                     content: "<p>Come to Oval Room</p>",
        //                     html: true,
        //                 });
        //             }}
        //         />

        //         {isModalOpen && (
        //             <div
        //                 style={{
        //                     position: 'fixed',
        //                     top: '50%',
        //                     left: '50%',
        //                     transform: 'translate(-50%, -50%)',
        //                     backgroundColor: 'white',
        //                     border: '1px solid #ccc',
        //                     padding: '20px',
        //                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        //                     zIndex: '1050',
        //                 }}
        //             >
        //                 <button
        //                     onClick={closeModal}
        //                     style={{
        //                         position: 'absolute',
        //                         top: '10px',
        //                         right: '10px',
        //                         border: 'none',
        //                         background: 'none',
        //                         cursor: 'pointer',
        //                     }}
        //                 >
        //                     X
        //                 </button>
        //                 <form onSubmit={handleSubmit}>
        //                     <input
        //                         type="text"
        //                         name="title"
        //                         value={eventData.title}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                         placeholder="Event Title"
        //                         required
        //                     />
        //                     <input
        //                         type="text"
        //                         name="venue"
        //                         value={eventData.venue}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                         placeholder="Venue"
        //                         required
        //                     />
        //                     <input
        //                         type="datetime-local"
        //                         name="start"
        //                         value={eventData.start}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                         placeholder="Start Date and Time"
        //                         required
        //                     />
        //                     <input
        //                         type="datetime-local"
        //                         name="end"
        //                         value={eventData.end}
        //                         onChange={handleChange}
        //                         className="form-control"
        //                         placeholder="End Date and Time"
        //                         required
        //                     />
        //                     <button type="submit">Confirm</button>
        //                 </form>
        //             </div>
        //         )}
        //     </div>
        // </Example>
        
        <Example>
            <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
                <h1 className="mb-2 font-sans text-4xl font-bold text-left" >Calendar</h1>
                <hr className="mx-auto mt-6" style={{ borderColor: '#E4E4E4', borderWidth: '1px' }} />
                <div className="flex justify-center mt-3 mb-4">
                <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4', width: '100%' }}>
                    <div className="flex items-center" style={{ width: '100%' }}>
                    <input
                        type="search"
                        className="flex-grow px-4 py-2 border-none input-no-outline"
                        placeholder="Search for events"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ outline: 'none' }}
                    />
                    </div>
                </div>
                <button
                    onClick={() => { alert('Clicked the find events button!') }}
                    className="flex items-center justify-center my-4 mx-6 px-4 py-0 rounded-full text-white bg-blue-500 hover:bg-blue-700 whitespace-nowrap">
                    Find Event
                </button>
                <button
                    onClick={() => { alert('Clicked the print button!') }}
                    className="flex items-center justify-center">
                    <img src={PrintButton} alt="Print" className="w-12 h-12" />
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
                            content: "<p>Come to Oval Room</p>",
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
                                type="text"
                                name="venue"
                                value={eventData.venue}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Venue"
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
        </Example>
    );
}

export default Calendar;
