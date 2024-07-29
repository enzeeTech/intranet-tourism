// import React, { useState, useEffect, useRef } from 'react';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction';
// import searchIcon from '../../../public/assets/search.png';
// import searchButton from '../../../public/assets/searchButton.png';
// import printIcon from '../../../public/assets/PrintPDF.svg';
// import * as bootstrap from "bootstrap";
// import "./Calendar/index.css";
// import Example from '@/Layouts/DashboardLayoutNew';
// import PageTitle from '@/Components/Reusable/PageTitle';
// import PrintCalendar from './Calendar/PrintCalendar';
// import { useCsrf } from "@/composables";

// function Calendar() {
//     const [events, setEvents] = useState([]);
//     const [filteredEvents, setFilteredEvents] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [eventData, setEventData] = useState({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple' });
//     const [searchTerm, setSearchTerm] = useState('');
//     const csrfToken = useCsrf();
//     const [showPrint, setShowPrint] = useState(false);
//     const calendarRef = useRef(null);

//     useEffect(() => {
//         fetchEvents();
//     }, []);

//     useEffect(() => {
//         filterEvents();
//     }, [searchTerm, events]);

//     const fetchEvents = () => {
//         fetch('/api/events/events?with[]=author')
//             .then(response => response.json())
//             .then(data => {
//                 const formattedEvents = data.data.data.map(event => ({
//                     id: event.id,
//                     title: event.title,
//                     start: event.start_at,
//                     end: event.end_at,
//                     description: event.description,
//                     venue: event.venue,
//                     color: event.color,
//                     userName: event.author.name,
//                 }));
//                 setEvents(formattedEvents);
//                 setFilteredEvents(formattedEvents);
//                 // Set the calendar to the current date
//                 if (calendarRef.current) {
//                     calendarRef.current.getApi().gotoDate(new Date());
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching events: ', error);
//             });
//     };

//     const filterEvents = () => {
//         if (searchTerm.trim() === '') {
//             setFilteredEvents(events);
//             if (calendarRef.current) {
//                 calendarRef.current.getApi().gotoDate(new Date());
//             }
//         } else {
//             const filtered = events.filter(event => 
//                 event.title.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//             setFilteredEvents(filtered);
    
//             if (filtered.length > 0 && calendarRef.current) {
//                 const firstEventDate = new Date(filtered[0].start);
//                 calendarRef.current.getApi().gotoDate(firstEventDate);
//             }
//         }
//     };

//     const handleDateSelect = (info) => {
//         const selectedDate = new Date(info.startStr);
//         const formatDate = (date) => {
//             const year = date.getFullYear();
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const day = String(date.getDate()).padStart(2, '0');
//             return `${year}-${month}-${day}`;
//         };
//         setIsModalOpen(true);
//         setEventData({
//             title: '',
//             venue: '',
//             date: formatDate(selectedDate),
//             startTime: '',
//             endTime: '',
//             color: 'purple'
//         });
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//         setEventData({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple' });
//     };

//     const handleChange = (e) => {
//         setEventData({ ...eventData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formatDateTime = (date, time) => `${date}T${time}`;
//         const eventPayload = {
//             title: eventData.title,
//             venue: eventData.venue,
//             start_at: formatDateTime(eventData.date, eventData.startTime),
//             end_at: formatDateTime(eventData.date, eventData.endTime),
//             color: eventData.color,
//         };
//         fetch('/api/events/events', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-Token': csrfToken,
//             },
//             body: JSON.stringify(eventPayload),
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 if (data.errors) {
//                     console.error('Error creating event: ', data.errors);
//                     return;
//                 }
//                 setEvents([...events, data]);
//                 closeModal();
//             })
//             .catch(error => {
//                 console.error('Error creating event: ', error);
//             });
//     };

//     const handlePrint = () => {
//         setShowPrint(true);
//         setTimeout(() => {
//             window.print();
//             setShowPrint(false);
//         }, 1000); // Wait for the print layout to render before calling print
//     };


//     return (
//         <Example>
//             <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
//                 <h1 className="mb-2 font-sans text-4xl font-bold text-left">Calendar</h1>
//                 <hr className="mx-auto" style={{ borderColor: '#E4E4E4', borderWidth: '2px' }} />
//                 <div className="flex justify-center mt-3 mb-4">
//                     <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4', width: '90%' }}>
//                         <div className="flex items-center" style={{ width: '100%' }}>
//                             <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
//                                 <img src={searchIcon} alt="Search" className="w-10 h-10" />
//                             </span>
//                             <input
//                                 type="search"
//                                 className="flex-grow px-4 py-2 border-none input-no-outline"
//                                 placeholder="Search for events"
//                                 aria-label="Search"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 style={{ outline: 'none' }}
//                             />
//                             <button
//                                 onClick={filterEvents}
//                                 className="flex items-center justify-center py-2 mr-2">
//                                 <img src={searchButton} alt="Find Events" className="w-30 h-11" />
//                             </button>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handlePrint}
//                         className="flex items-center justify-center mb-2 ml-2">
//                         <img src={printIcon} alt="Print" className="w-12 h-12" />
//                     </button>
//                 </div>
//                 <div className='flex justify-end -mt-5' >
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="px-4 py-2 mb-4 text-white bg-blue-500 rounded">
//                         Add Event
//                     </button>
//                 </div>

//                 <FullCalendar
//                     plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
//                     initialView="dayGridMonth"
//                     selectable={true}
//                     selectHelper={true}
//                     ref={calendarRef}
//                     select={handleDateSelect}
//                     headerToolbar={{
//                         start: 'prev,next today title',
//                         center: '',
//                         end: 'dayGridMonth,timeGridWeek,timeGridDay',
//                     }}
//                     height={650}
//                     buttonText={{
//                         today: 'Today',
//                         year: 'Year',
//                         month: 'Month',
//                         day: 'Day',
//                     }}
//                     events={filteredEvents}
//                     eventDidMount={(info) => {
//                         const formattedStartTime = new Date(info.event.start).toLocaleString('en-US', {
//                             hour: 'numeric',
//                             minute: 'numeric',
//                             hour12: true
//                         });
//                         return new bootstrap.Popover(info.el, {
//                             placement: "auto",
//                             trigger: "hover",
//                             container: 'body',
//                             customClass: "custom-popover",
//                             content: `<div>
//                                         <p class="event-title"><strong>${info.event.title}</strong></p>
//                                         <p><strong>Start Time:</strong> ${formattedStartTime}</p>
//                                         <p><strong>Created by:</strong> ${info.event.extendedProps.userName}</p>
//                                         <p><strong>Venue:</strong> ${info.event.extendedProps.venue || 'No venue'}</p>
//                                         <hr style="border: 10px solid #000;" />
//                                         <p><strong>Invited People: </strong></p>
//                                     </div>`,
//                             html: true,
//                         });
//                     }}
//                     eventContent={(eventInfo) => {
//                         return (
//                             <div
//                                 style={{
//                                     backgroundColor: eventInfo.event.backgroundColor,
//                                     padding: '0 5px',
//                                     borderRadius: '2px',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     height: '100%',
//                                     width: '100%',
//                                     whiteSpace: 'nowrap', // Ensure the title doesn't wrap
//                                     overflow: 'hidden', // Hide overflow text
//                                     textOverflow: 'ellipsis', // Add ellipsis for overflow text
//                                 }}
//                                 className="fc-event-title"
//                             >
//                                 <div
//                                     style={{
//                                         borderLeft: `5px solid ${eventInfo.event.backgroundColor}`,
//                                         height: '100%',
//                                         // marginRight: '5px',
//                                         opacity: '50%',
//                                     }}
//                                 />
//                                 <span className="event-title" style={{ color: 'white' }}>
//                                     {eventInfo.event.title}
//                                 </span>
//                             </div>
//                         );
//                     }}
//                 />
//                 <div className='pb-10'></div>
//                 {isModalOpen && (
//                     <div
//                         style={{
//                             position: 'fixed',
//                             top: '50%',
//                             left: '50%',
//                             transform: 'translate(-50%, -50%)',
//                             backgroundColor: 'white',
//                             border: '1px solid #ccc',
//                             padding: '20px',
//                             boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//                             zIndex: '1050',
//                         }}
//                     >
//                         <button
//                             onClick={closeModal}
//                             style={{
//                                 position: 'absolute',
//                                 top: '10px',
//                                 right: '10px',
//                                 border: 'none',
//                                 background: 'none',
//                                 cursor: 'pointer',
//                             }}
//                         >
//                             X
//                         </button>
//                         <form onSubmit={handleSubmit}>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 value={eventData.title}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 placeholder="Event Title"
//                                 required
//                             />
//                             <input
//                                 type="text"
//                                 name="venue"
//                                 value={eventData.venue}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 placeholder="Venue"
//                                 required
//                             />
//                             <input
//                                 type="date"
//                                 name="date"
//                                 value={eventData.date}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 placeholder="Date"
//                                 required
//                             />
//                             <input
//                                 type="time"
//                                 name="startTime"
//                                 value={eventData.startTime}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 placeholder="Start Time"
//                                 required
//                             />
//                             <input
//                                 type="time"
//                                 name="endTime"
//                                 value={eventData.endTime}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 placeholder="End Time"
//                                 required
//                             />
//                             <select
//                                 name="color"
//                                 value={eventData.color}
//                                 onChange={handleChange}
//                                 className="form-control"
//                                 required
//                             >
//                                 <option value="red">Red</option>
//                                 <option value="blue">Blue</option>
//                                 <option value="green">Green</option>
//                                 <option value="orange">Orange</option>
//                                 <option value="purple">Purple</option>
//                                 <option value="DeepPink">Pink</option>
//                                 <option value="black">Black</option>
//                                 <option value="gray">Gray</option>
//                             </select>
//                             <button type="submit">Confirm</button>
//                         </form>
//                     </div>
//                 )}
//                 {showPrint && <PrintCalendar events={filteredEvents} />}
//             </div>
//         </Example>
//     );
// }

// export default Calendar;



import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import searchIcon from '../../../public/assets/search.png';
import searchButton from '../../../public/assets/searchButton.png';
import printIcon from '../../../public/assets/PrintPDF.svg';
import * as bootstrap from "bootstrap";
import "./Calendar/index.css";
import Example from '@/Layouts/DashboardLayoutNew';
import PageTitle from '@/Components/Reusable/PageTitle';
import PrintCalendar from './Calendar/PrintCalendar';
import { useCsrf } from "@/composables";

function Calendar() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple' });
    const [searchTerm, setSearchTerm] = useState('');
    const csrfToken = useCsrf();
    const [showPrint, setShowPrint] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [printRange, setPrintRange] = useState({ startDate: '', endDate: '' });
    const calendarRef = useRef(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    useEffect(() => {
        filterEvents();
    }, [searchTerm, events]);

    const fetchEvents = () => {
        fetch('/api/events/events?with[]=author')
            .then(response => response.json())
            .then(data => {
                const formattedEvents = data.data.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: event.start_at,
                    end: event.end_at,
                    description: event.description,
                    venue: event.venue,
                    color: event.color,
                    userName: event.author.name,
                }));
                setEvents(formattedEvents);
                setFilteredEvents(formattedEvents);
                // Set the calendar to the current date
                if (calendarRef.current) {
                    calendarRef.current.getApi().gotoDate(new Date());
                }
            })
            .catch(error => {
                console.error('Error fetching events: ', error);
            });
    };

    const filterEvents = () => {
        if (searchTerm.trim() === '') {
            setFilteredEvents(events);
            if (calendarRef.current) {
                calendarRef.current.getApi().gotoDate(new Date());
            }
        } else {
            const filtered = events.filter(event => 
                event.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredEvents(filtered);
    
            if (filtered.length > 0 && calendarRef.current) {
                const firstEventDate = new Date(filtered[0].start);
                calendarRef.current.getApi().gotoDate(firstEventDate);
            }
        }
    };

    const handleDateSelect = (info) => {
        const selectedDate = new Date(info.startStr);
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        setIsModalOpen(true);
        setEventData({
            title: '',
            venue: '',
            date: formatDate(selectedDate),
            startTime: '',
            endTime: '',
            color: 'purple'
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventData({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple' });
    };

    const closePrintModal = () => {
        setIsPrintModalOpen(false);
        setPrintRange({ startDate: '', endDate: '' });
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handlePrintRangeChange = (e) => {
        setPrintRange({ ...printRange, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formatDateTime = (date, time) => `${date}T${time}`;
        const eventPayload = {
            title: eventData.title,
            venue: eventData.venue,
            start_at: formatDateTime(eventData.date, eventData.startTime),
            end_at: formatDateTime(eventData.date, eventData.endTime),
            color: eventData.color,
        };
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

    const handlePrint = () => {
        setIsPrintModalOpen(true);
    };

    const handlePrintSubmit = () => {
        const filteredEvents = events.filter(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const rangeStart = new Date(printRange.startDate);
            const rangeEnd = new Date(printRange.endDate);

            return (eventStart >= rangeStart && eventEnd <= rangeEnd);
        });
        setFilteredEvents(filteredEvents);
        setShowPrint(true);
        setTimeout(() => {
            window.print();
            setShowPrint(false);
        }, 1000);
        closePrintModal();
    };

    return (
        <Example>
            <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
                <h1 className="mb-2 font-sans text-4xl font-bold text-left">Calendar</h1>
                <hr className="mx-auto" style={{ borderColor: '#E4E4E4', borderWidth: '2px' }} />
                <div className="flex justify-center mt-3 mb-4">

                    {/* <div className="flex justify-center mt-4 mb-5 rounded-full border-2 w-full" >
                        <div className="flex items-center" style={{ width: '100%' }}>
                        <input
                            type="search"
                            className="flex-grow px-4 py-2 border-none input-no-outline"
                            placeholder="Search for events"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ outline: 'none' }}
                        />  */}

                    <div className="flex justify-center mt-4 mb-5 rounded-full" style={{ border: '2px solid #E4E4E4', width: '90%' }}>
                        <div className="flex items-center" style={{ width: '100%' }}>
                            <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
                                <img src={searchIcon} alt="Search" className="w-10 h-10" />
                            </span>
                            <input
                                type="search"
                                className="flex-grow px-4 py-2 border-none input-no-outline"
                                placeholder="Search for events"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ outline: 'none' }}
                            />
                            <button
                                onClick={filterEvents}
                                className="flex items-center justify-center py-2 mr-2">
                                <img src={searchButton} alt="Find Events" className="w-30 h-11" />
                            </button>
                        </div>

                    </div>
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center mb-2 ml-2">
                        <img src={printIcon} alt="Print" className="w-12 h-12" />
                    </button>
                </div>

                {/* <button
                    onClick={() => { alert('Clicked the find events button!') }}
                    className="flex items-center justify-center my-4 mx-6 px-4 py-0 rounded-full text-white bg-blue-500 hover:bg-blue-700 whitespace-nowrap max-md:text-sm max-md:mx-2">
                    Find Event
                </button>
                <button
                    onClick={() => { alert('Clicked the print button!') }}
                    className="flex items-center justify-center">
                    <img src={PrintButton} alt="Print" className="w-12 h-12 max-md:w-20 max-md:h-20" />
                </button>
                </div>

                <div className="mb-8">
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
                        buttonText={{ */}

                <div className='flex justify-end -mt-5' >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded">
                        Add Event
                    </button>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    selectHelper={true}
                    ref={calendarRef}
                    select={handleDateSelect}
                    headerToolbar={{
                        start: 'prev,next today title',
                        center: '',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    height={650}
                    buttonText={{

                        today: 'Today',
                        year: 'Year',
                        month: 'Month',
                        day: 'Day',

                        // }}
                        // events={events}
                        // eventDidMount={(info) => {
                        // return new bootstrap.Popover(info.el, {
                        //     title: info.event.title,
                        //     placement: "auto",
                        //     trigger: "hover",
                        //     customClass: "popoverStyle",
                        //     content: "<p>Come to Oval Room</p>",

                    }}
                    events={filteredEvents}
                    eventDidMount={(info) => {
                        const formattedStartTime = new Date(info.event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const formattedEndTime = new Date(info.event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const tooltipContent = `
                        <div>
                            <div><strong>Title:</strong> ${info.event.title}</div>
                            <div><strong>Venue:</strong> ${info.event.extendedProps.venue}</div>
                            <div><strong>Date:</strong> ${new Date(info.event.start).toLocaleDateString()}</div>
                            <div><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</div>
                            <div><strong>Description:</strong> ${info.event.extendedProps.description}</div>
                            <div><strong>Color:</strong> ${info.event.backgroundColor}</div>
                            <div><strong>Created by:</strong> ${info.event.extendedProps.userName}</div>
                        </div>
                    `;

                        const tooltip = new bootstrap.Tooltip(info.el, {
                            title: tooltipContent,

                            html: true,
                            placement: 'top',
                            container: 'body',
                        });

                        info.el.addEventListener('mouseenter', () => {
                            tooltip.show();
                        });

                        info.el.addEventListener('mouseleave', () => {
                            tooltip.hide();
                        });
                        }}
                    />
                    

                    {/* {isModalOpen && (
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
                            right: '20px',
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
                        <button type="submit" className="mx-4">Confirm</button>
                        </form>
                    </div>
                    )} */}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Create New Event</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        value={eventData.title}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="venue">Venue</label>
                                    <input
                                        type="text"
                                        name="venue"
                                        id="venue"
                                        value={eventData.venue}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={eventData.date}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="startTime">Start Time</label>
                                    <input
                                        type="time"
                                        name="startTime"
                                        id="startTime"
                                        value={eventData.startTime}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="endTime">End Time</label>
                                    <input
                                        type="time"
                                        name="endTime"
                                        id="endTime"
                                        value={eventData.endTime}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="color">Color</label>
                                    <select
                                        name="color"
                                        id="color"
                                        value={eventData.color}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    >
                                        <option value="purple">Purple</option>
                                        <option value="blue">Blue</option>
                                        <option value="green">Green</option>
                                        <option value="red">Red</option>
                                    </select>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isPrintModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Select Date Range for Printing</h2>
                            <form onSubmit={handlePrintSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        value={printRange.startDate}
                                        onChange={handlePrintRangeChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2" htmlFor="endDate">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        value={printRange.endDate}
                                        onChange={handlePrintRangeChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={closePrintModal}
                                        className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Print
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showPrint && <PrintCalendar events={filteredEvents} />}

            </div>
        </Example>
    );
}

export default Calendar;
