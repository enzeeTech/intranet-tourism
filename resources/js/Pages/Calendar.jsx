import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import searchIcon from '../../../public/assets/search.png';
import printIcon from '../../../public/assets/PrintPDF.svg';
import pencilIcon from '../../../public/assets/EditIcon.svg';
import * as bootstrap from "bootstrap";
import "./Calendar/index.css";
import Example from '@/Layouts/DashboardLayoutNew';
import PrintCalendar from './Calendar/PrintCalendar';
import { useCsrf } from "@/composables";
// import { CakeIcon } from '@heroicons/react/20/solid';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [eventData, setEventData] = useState({ 
        title: '', 
        venue: '', 
        startDate: '', 
        endDate: '', 
        startTime: '', 
        endTime: '', 
        color: 'purple', 
        url: '' 
    });
    const [includeUrl, setIncludeUrl] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const csrfToken = useCsrf();
    const [showPrint, setShowPrint] = useState(false);
    const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
    const [printRange, setPrintRange] = useState({ startDate: '', endDate: '' });
    const [isUrlFieldVisible, setIsUrlFieldVisible] = useState(false);
    const [eventId, setEventId] = useState(null);
    const calendarRef = useRef(null);

    useEffect(() => {
        fetchEvents();
        fetchBirthdayEvents(); // Fetch and add birthday events
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
                setEvents(prevEvents => [...prevEvents, ...formattedEvents]);
                setFilteredEvents(prevEvents => [...prevEvents, ...formattedEvents]);
                if (calendarRef.current) {
                    calendarRef.current.getApi().gotoDate(new Date());
                }
            })
            .catch(error => {
                console.error('Error fetching events: ', error);
            });
    };

    const fetchBirthdayEvents = async () => {
        try {
            let allProfiles = [];
            let currentPage = 1;
            let totalPages = 1; // Initialize totalPages to ensure at least one request
        
            while (currentPage <= totalPages) {
                const response = await fetch(`/api/profile/profiles?page=${currentPage}`);
                const data = await response.json();
    
                console.log("RESPONSE", data);
    
                if (data && data.data && Array.isArray(data.data.data)) {
                    // Accumulate profiles
                    allProfiles = [...allProfiles, ...data.data.data];
        
                    // Update totalPages based on the response
                    totalPages = data.data.last_page;
                    currentPage++;
                } else {
                    console.error('Error: Expected an array, but got:', data);
                    break; // Exit loop if the expected structure is not found
                }
            }
        
            // Now that we have all profiles, map them to birthday events
            const birthdayEvents = allProfiles.map(profile => {
                const dob = new Date(profile.dob);
                const currentYear = new Date().getFullYear();
                dob.setFullYear(currentYear); // Adjust the DOB to the current year
        
                return {
                    title: `Birthday: ${profile.bio}`,
                    start: dob.toISOString().split('T')[0], // Only date, no time
                    allDay: true,
                    backgroundColor: 'transparent',
                    borderColor: 'blue',
                    textColor: 'blue',
                    isBirthday: true, // Custom property to identify birthday events
                };
            });
        
            // Set the events state with all the accumulated birthday events
            setEvents(prevEvents => [...prevEvents, ...birthdayEvents]);
            setFilteredEvents(prevEvents => [...prevEvents, ...birthdayEvents]);
        } catch (error) {
            console.error('Error fetching birthdays: ', error);
        }
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
            startDate: formatDate(selectedDate),
            endDate: '',
            startTime: '',
            endTime: '',
            color: 'purple',
            url: ''
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventData({ 
            title: '', 
            venue: '', 
            startDate: '', 
            endDate: '', 
            startTime: '', 
            endTime: '', 
            color: 'purple', 
            url: '' 
        });
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEventData({ 
            title: '', 
            venue: '', 
            startDate: '', 
            endDate: '', 
            startTime: '', 
            endTime: '', 
            color: 'purple', 
            url: '' 
        });
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
            start_at: formatDateTime(eventData.startDate, eventData.startTime),
            end_at: formatDateTime(eventData.endDate, eventData.endTime),
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
                setIsModalOpen(false);
                fetchEvents()
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
        info.jsEvent.preventDefault();
        info.jsEvent.stopPropagation();
        if (info.event.url && info.event.url.trim() && info.event.url !== 'null') {
            window.open(info.event.url, '_blank');
        } else {
            alert('This event does not have a URL.');
        }
    };
    
    const handleEditClick = (event) => {
        const formatTime = (date) => {
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };
    
        const url = event.url !== 'null' ? event.url : ''; // Handle 'null' or undefined
    
        setEventId(event.id); // Set the event ID
        setEventData({
            title: event.title,
            venue: event.extendedProps.venue,
            startDate: event.start.toISOString().split('T')[0],
            endDate: event.end ? event.end.toISOString().split('T')[0] : '',
            startTime: formatTime(event.start),
            endTime: event.end ? formatTime(event.end) : '',
            color: event.backgroundColor,
            url: url
        });
    
        setIncludeUrl(url !== ''); // Only set to true if URL is not an empty string
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const FfData = new FormData();
            FfData.append('_method', 'PUT');
            FfData.append('title', eventData.title);
            FfData.append('venue', eventData.venue);
            FfData.append('start_at', `${eventData.startDate}T${eventData.startTime}`);
            FfData.append('end_at', `${eventData.endDate}T${eventData.endTime}`);
            FfData.append('color', eventData.color);
            FfData.append('url', eventData.url || '');
    
            const response = await fetch(`/api/events/events/${eventId}`, {
                method: 'POST',
                body: FfData,
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
    
            if (response.ok) {
                const updatedEvent = await response.json();
                setEvents((prevEvents) =>
                    prevEvents.map((event) => (event.id === eventId ? updatedEvent : event))
                );
                setIsEditModalOpen(false);
                fetchEvents()
            } else {
                const errorData = await response.json();
                console.error('Error updating event:', errorData);
            }
        } catch (error) {
            console.error('Error updating event:', error);
            setIsEditModalOpen(false);
            fetchEvents()
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/events/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
            });
    
            if (response.ok) {
                setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
                setIsEditModalOpen(false);
            } else {
                const errorData = await response.json();
                console.error('Error deleting event:', errorData);
            }
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <Example>
            <div className="container mx-auto mt-4 " style={{ maxWidth: '90%' }}>
                <h1 className="mb-3 font-sans text-4xl font-bold text-left">Calendar</h1>
                <hr className="mx-auto my-2" style={{ borderColor: '#E4E4E4', borderWidth: '1px' }} />
                <div className="flex flex-col items-center w-full mt-3 mb-8">
                    <div className="flex items-center justify-between w-full">
                        <input
                            type="search"
                            className="flex-grow px-6 py-3 mt-2 font-bold bg-gray-100 border-gray-100 rounded-full input-no-outline"
                            placeholder="Search for events"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={handlePrint}
                            className="flex items-center justify-center px-4 py-3 mx-3 mt-2 bg-red-500 rounded-full hover:bg-red-700">
                            <img src={printIcon} alt="Print" className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center text-white bg-blue-500 hover:bg-blue-700 mt-2 px-4 py-3.5 rounded-full">
                            <img src="/assets/plus.svg" alt="Plus icon" className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    selectHelper={true}
                    ref={calendarRef}
                    select={handleDateSelect}
                    eventClick={handleEventClick}
                    height={650}
                    buttonText={{
                        today: 'Today',
                        year: 'Year',
                        month: 'Month',
                        day: 'Day',
                    }}
                    events={filteredEvents}
                    eventDidMount={(info) => {
                        if (info.event.extendedProps.isBirthday) {
                            info.el.style.backgroundColor = 'transparent';
                            info.el.style.borderColor = 'blue';
                            info.el.style.color = 'blue';
                        }
                    
                        const formattedStartTime = new Date(info.event.start).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        });
                        const urlContent = (info.event.url && info.event.url.trim() && info.event.url !== 'null') 
                            ? `<p><strong>Url:</strong> ${info.event.url}</p>` 
                            : '';
                    
                        const isBirthday = info.event.extendedProps.isBirthday;
                    
                        const popoverContent = `
                            <div>
                                <p class="event-title"><strong>${info.event.title}</strong></p>
                                ${!isBirthday ? `<p><strong>Created by:</strong> ${info.event.extendedProps.userName}</p>` : ''}
                                ${!isBirthday ? `<p><strong>Venue:</strong> ${info.event.extendedProps.venue || 'No venue'}</p>` : ''}
                                ${urlContent} <!-- Only include if URL is valid -->
                                <hr style="border: 10px solid #000;" />
                            </div>`;
                    
                        return new bootstrap.Popover(info.el, {
                            placement: "auto",
                            trigger: "hover",
                            container: 'body',
                            customClass: "custom-popover",
                            content: popoverContent,
                            html: true,
                        });
                    }}
                    
                    eventContent={(eventInfo) => {
                        const isBirthday = eventInfo.event.extendedProps.isBirthday;
                        const borderColor = isBirthday ? 'blue' : eventInfo.backgroundColor;
                        return (
                            <div
                                style={{
                                    backgroundColor: eventInfo.backgroundColor,
                                    padding: '0 15px',
                                    borderRadius: '2px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '100%',
                                    width: '100%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    border: isBirthday ? `2px solid ${borderColor}` : '', // Set border color for birthday
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
                                <span className="event-title" style={{ color: isBirthday ? borderColor : 'white', flexGrow: 1 }}>
                                    {eventInfo.event.title}
                                </span>
                                {!isBirthday && (
                                    <img
                                        src={pencilIcon}
                                        alt="Edit"
                                        className="inline-block w-4 h-4 ml-2 cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent triggering other event handlers
                                            e.preventDefault(); // Prevent default behavior
                                            handleEditClick(eventInfo.event);
                                        }}
                                    />
                                )}
                            </div>
                        );
                    }}
                />

                <div className='pb-10'></div>
                
                {isModalOpen && (
                    <div className="modal-container">
                        <h1 className="flex items-start mx-4 mb-4 text-2xl font-bold text-neutral-800">Create New Event</h1>
                        <button onClick={closeModal} className="mt-2 mr-2 modal-close-button">
                            <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
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
                            <div className="flex items-start font-bold text-md text-neutral-800">Start Date</div>
                            <input
                                type="date"
                                name="startDate"
                                value={eventData.startDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Start Date"
                                required
                            />
                            {/* <input
                                type="time"
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Start Time"
                                required
                            /> */}
                            <div className="flex items-start font-semibold text-md text-neutral-800">End Date</div>
                            <input
                                type="date"
                                name="endDate"
                                value={eventData.endDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="End Date"
                                required
                            />
                            {/* <input
                                type="time"
                                name="endTime"
                                value={eventData.endTime}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="End Time"
                                required
                            /> */}
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
                                    className="mt-2 form-control"
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

                {isEditModalOpen && (
                    <div className="modal-container">
                        <button onClick={closeEditModal} className="mt-2 mr-2 modal-close-button">
                            <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
                        </button>
                        <form onSubmit={handleEditSubmit}>
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
                                name="startDate"
                                value={eventData.startDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Start Date"
                                required
                            />
                            <input
                                type="date"
                                name="endDate"
                                value={eventData.endDate}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="End Date"
                                required
                            />
                            {/* <input
                                type="time"
                                name="startTime"
                                value={eventData.startTime}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Start Time"
                                required
                            /> */}
                            {/* <input
                                type="time"
                                name="endTime"
                                value={eventData.endTime}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="End Time"
                                required
                            /> */}
                            <div className="form-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        className='mr-2'
                                        name="includeUrl"
                                        checked={includeUrl}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setIncludeUrl(isChecked);
                                            if (!isChecked) {
                                                setEventData(prevState => ({ ...prevState, url: '' })); // Clear URL if unchecked
                                            }
                                        }}
                                    />
                                    Include URL
                                </label>
                                {includeUrl && (
                                    <input
                                        type="url"
                                        className="mt-2 form-control"
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
                            <div className="button-container">
                                <button type="submit" className="modal-save-button">
                                    Save
                                </button>
                                <button type="button" className="modal-delete-button" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {isPrintModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
                            <h2 className="mb-4 text-xl font-bold">Select Date Range for Printing</h2>
                            <form onSubmit={handlePrintSubmit}>
                                <div className="mb-2">
                                    <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="startDate">Start Date</label>
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
                                    <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="endDate">End Date</label>
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
                                        className="px-4 py-2 mr-2 text-gray-400 border-2 border-gray-400 rounded-full hover:bg-gray-400 hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-700"
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