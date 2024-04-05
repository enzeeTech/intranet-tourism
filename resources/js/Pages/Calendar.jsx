import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import searchIcon from '../../../public/assets/search.png';
import searchButton from '../../../public/assets/searchButton.png';

function Calendar() {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({ title: '', start: '', end: '', color: 'purple' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios.get('/calendar/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events: ', error);
            });
    };

    const handleDateSelect = (info) => {
        setIsModalOpen(true);
        setEventData({ ...eventData, start: info.startStr, end: info.endStr });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEventData({ title: '', start: '', end: '', color: 'purple' });
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/calendar/event', eventData)
            .then(response => {
                setEvents([...events, eventData]);
                closeModal();
            })
            .catch(error => {
                console.error('Error creating event: ', error);
            });
    };

    return (
        <div className="container mx-auto mt-4" style={{ maxWidth: '90%' }}>
            <h1 className="mb-2 font-sans text-4xl font-bold text-left">Calendar</h1>
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
                    start: 'prev,next today',
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
                events={events}
                eventDidMount={(info) => {
                    // Implement your event customization logic here
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
    );
}

export default Calendar;
