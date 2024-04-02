import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


function Calendar() {
  return (
    <div>
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={
                {
                    start: 'prev,next today', 
                    center: 'title',
                    end: 'dayGridMonth,timeGridWeek,timeGridDay' 
                }
            }
            height={'100vh'}
        />
    </div>
  )
}

export default Calendar