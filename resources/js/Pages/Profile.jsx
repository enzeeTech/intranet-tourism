import React from 'react';

const events = [
  {
    date: "19",
    month: "Jan",
    title: "Conference",
    time: "January 19, 2024, 12:30 PM",
  },
  {
    date: "21",
    month: "Jan",
    title: "Corporate event",
    time: "January 21, 2024, 08:00 AM",
  },
  {
    date: "12",
    month: "Feb",
    title: "Exhibition",
    time: "February 12, 2024, 07:00 PM",
  },
];

const EventItem = ({ event }) => {
  return (
    <div className="flex gap-3 p-2 border-b border-l-gray-200">
      <div className="flex flex-col pb-2.5 font-bold text-center whitespace-nowrap bg-red-500 rounded-lg shadow-sm h-[64px] w-[54px]">
        <div className="justify-center px-5 py-3 text-xs bg-white rounded-t-md text-neutral-800">
          {event.date}
        </div>
        <div className="self-center mt-1 text-xs text-white uppercase">
          {event.month}
        </div>
      </div>
      <div className="flex flex-col self-start text-sm font-semibold">
        <div className="font-bold text-neutral-800">{event.title}</div>
        <div className="mt-2.5 text-neutral-400">{event.time}</div>
        <div className="mt-2.5 text-xs text-sky-500 underline">More</div>
      </div>
    </div>
    
  );
};

const FeaturedEvents = () => {
  return (
    <div className="flex flex-col justify-center max-w-[291px]">
      <div className="flex flex-col px-4 py-5 w-full bg-white rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-neutral-800">Featured Events</h2>
        {events.map((event, index) => (
          <EventItem key={index} event={event} />
        ))}
        <div className="flex gap-2 mt-4 text-xs font-semibold uppercase text-neutral-800">
          <div className="my-auto">View All</div>
          <img
            loading="lazy"
            src="assets\Group 101.jpg"
            alt="Arrow icon"

          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedEvents;
