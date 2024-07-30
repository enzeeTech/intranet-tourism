import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import searchIcon from '../../../public/assets/search.png';
import searchButton from '../../../public/assets/searchButton.png';
import printIcon from '../../../public/assets/PrintPDF.svg';
import pencilIcon from '../../../public/assets/EditIcon.svg'
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
    const [eventData, setEventData] = useState({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple', url: '' });
    const [includeUrl, setIncludeUrl] = useState(false);
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
                    url: event.url,
                }));
                setEvents(formattedEvents);
                setFilteredEvents(formattedEvents);
                // Set the calendar to the current date
                if (calendarRef.current) {
                    calendarRef.current.getApi().gotoDate(new Date());
                }
                console.log("KK", formattedEvents);
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
        setEventData({ title: '', venue: '', date: '', startTime: '', endTime: '', color: 'purple', url: '' });
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
            url: includeUrl ? eventData.url : null,

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

    const handleEventClick = (info) => {
        // Prevent default behavior
        info.jsEvent.preventDefault();
        info.jsEvent.stopPropagation();
        
        // Check if the event has a URL
        if (info.event.url && info.event.url.trim() && info.event.url !== 'null') {
            // Open the URL in a new tab
            window.open(info.event.url, '_blank');
        } else {
            // Optionally, display a message or take other actions if no URL is present
            alert('This event does not have a URL.');
        }
    };
    
    const handleEditClick = (event) => {
        // Logic to handle the edit action, e.g., opening a modal with event details for editing
        console.log('Editing event:', event);
        // You can set state to show an edit modal here
        setEventData({
            title: event.title,
            venue: event.venue,
            date: event.start,
            startTime: event.startTime,
            endTime: event.endTime,
            color: event.color,
            url: event.url || '',
        });
        setIsModalOpen(true);
    };
    
    

    return (
        <Example>
            <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
                <h1 className="mb-2 font-sans text-4xl font-bold text-left">Calendar</h1>
                <hr className="mx-auto" style={{ borderColor: '#E4E4E4', borderWidth: '2px' }} />
                <div className="flex justify-center mt-3 mb-4">

                    <div className="flex justify-center rounded-full" style={{ border: '2px solid #E4E4E4', width: '90%' }}>
                        <div className="flex items-center">
                            <span className="flex items-center justify-center p-2 bg-white rounded-l-full">
                                <img src={searchIcon} alt="Search" className="w-8 h-8 ml-4" />
                            </span>
                            <input
                                type="search"
                                className="flex-grow px-4 py-2 border-none input-no-outline"
                                placeholder="Search for events"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ outline: 'none', marginRight: '850px' }}
                            />
                            {/* <button
                                onClick={filterEvents}
                                className="flex items-center justify-center py-2 mr-2">
                                <img src={searchButton} alt="Find Events" className="w-30 h-11" />
                            </button> */}
                        </div>
                    </div>
                    <button
                        onClick={handlePrint}
                        className="flex items-center justify-center bg-red-500 hover:bg-red-700 px-4 rounded-full ml-3">
                        <img src={printIcon} alt="Print" className="w-6 h-6" />
                    </button>
                </div>

                <div className='flex justify-end mb-3' >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-full">
                        <img src="/assets/plus.svg" alt="Plus icon" className="w-3 h-3 mr-2" />
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
                    eventClick={handleEventClick}
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

                    }}
                    events={filteredEvents}
                    eventDidMount={(info) => {
                        const formattedStartTime = new Date(info.event.start).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                    
                        // Sanitize URL and check for empty or 'null' string
                        const urlContent = (info.event.url && info.event.url.trim() && info.event.url !== 'null') 
                            ? `<p><strong>Url:</strong> ${info.event.url}</p>` 
                            : '';
                    
                        return new bootstrap.Popover(info.el, {
                            placement: "auto",
                            trigger: "hover",
                            container: 'body',
                            customClass: "custom-popover",
                            content: `<div>
                                        <p class="event-title"><strong>${info.event.title}</strong></p>
                                        <p><strong>Start Time:</strong> ${formattedStartTime}</p>
                                        <p><strong>Created by:</strong> ${info.event.extendedProps.userName}</p>
                                        <p><strong>Venue:</strong> ${info.event.extendedProps.venue || 'No venue'}</p>
                                        ${urlContent} <!-- Only include if URL is valid -->
                                        <hr style="border: 10px solid #000;" />
                                        <p><strong>Invited People: </strong></p>
                                    </div>`,
                            html: true,
                        });
                    }}                    
                    // eventContent={(eventInfo) => {
                    //     return (
                    //         <div
                    //             style={{
                    //                 backgroundColor: eventInfo.event.backgroundColor,
                    //                 padding: '0 5px',
                    //                 borderRadius: '2px',
                    //                 display: 'flex',
                    //                 alignItems: 'center',
                    //                 height: '100%',
                    //                 width: '100%',
                    //                 whiteSpace: 'nowrap', // Ensure the title doesn't wrap
                    //                 overflow: 'hidden', // Hide overflow text
                    //                 textOverflow: 'ellipsis', // Add ellipsis for overflow text
                    //             }}
                    //             className="fc-event-title"
                    //         >
                    //             <div
                    //                 style={{
                    //                     borderLeft: `5px solid ${eventInfo.event.backgroundColor}`,
                    //                     height: '100%',
                    //                     opacity: '50%',
                    //                 }}
                    //             />
                    //             <span className="event-title" style={{ color: 'white' }}>
                    //                 {eventInfo.event.title}
                    //             </span>
                    //         </div>
                    //     );
                    // }}

                    eventContent={(eventInfo) => {
                        return (
                            <div
                                style={{
                                    backgroundColor: eventInfo.event.backgroundColor,
                                    padding: '0 5px',
                                    borderRadius: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    whiteSpace: 'nowrap', // Ensure the title doesn't wrap
                                    overflow: 'hidden', // Hide overflow text
                                    textOverflow: 'ellipsis', // Add ellipsis for overflow text
                                }}
                                className="fc-event-title"
                            >
                                <div
                                    style={{
                                        borderLeft: `5px solid ${eventInfo.event.backgroundColor}`,
                                        height: '100%',
                                        opacity: '50%',
                                    }}
                                />
                                <span className="event-title" style={{ color: 'white', flexGrow: 1 }}>
                                    {eventInfo.event.title}
                                </span>
                                <img
                                    src={pencilIcon}
                                    alt="Edit"
                                    className="w-4 h-4 ml-2 cursor-pointer inline-block"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering other event handlers
                                        e.preventDefault(); // Prevent default behavior
                                        handleEditClick(eventInfo.event);
                                    }}
                                />
                            </div>
                        );
                    }}
                />
                <div className='pb-10'></div>
                {isModalOpen && (
                    <div className="modal-container">
                    <div className="flex flex-col items-center">
                    <div className="flex justify-start items-center w-full">
                        <h2 className="text-xl font-bold pb-4">Create New Event</h2>
                        <button className="modal-close-button mt-2 pr-2" onClick={closeModal}>
                        X
                        </button>
                    </div>
                    </div>
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
                        type="date"
                        name="date"
                        value={eventData.date}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Date"
                        required
                      />
                      <input
                        type="time"
                        name="startTime"
                        value={eventData.startTime}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Start Time"
                        required
                      />
                      <input
                        type="time"
                        name="endTime"
                        value={eventData.endTime}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="End Time"
                        required
                      />
                        <div className="form-group">
                            <label>
                            <input
                                type="checkbox"
                                className='mr-2'
                                name="includeUrl"
                                checked={includeUrl}
                                onChange={(e) => setIncludeUrl(e.target.checked)}
                            />
                            Include URL
                            </label>
                            {includeUrl && (
                            <input
                                type="url"
                                className="form-control mt-2"
                                name="url"
                                value={eventData.url}
                                onChange={handleChange}
                                placeholder="Enter event URL"
                            />
                            )}
                        </div>
                      <select
                        name="color"
                        value={eventData.color}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                        <option value="DeepPink">Pink</option>
                        <option value="black">Black</option>
                        <option value="gray">Gray</option>
                      </select>
                      <button type="submit" className="modal-submit-button">
                        Confirm
                      </button>
                    </form>
                  </div>
                  
                )}
                {isPrintModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Select Date Range for Printing</h2>
                            <form onSubmit={handlePrintSubmit}>
                                <div className="mb-2">
                                    <label className="block text-md text-gray-700 font-bold mb-2" htmlFor="startDate">Start Date</label>
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
                                    <label className="block text-md text-gray-700 font-bold mb-2" htmlFor="endDate">End Date</label>
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
                                        className="mr-2 px-4 py-2 border-2 border-gray-400 text-gray-400 rounded-full hover:bg-gray-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
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