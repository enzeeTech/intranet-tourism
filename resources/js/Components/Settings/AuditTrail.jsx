import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  subDays
} from 'date-fns';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';

// Function to generate a random action
const generateRandomAction = (username) => {
  const actions = [
    'Logged in to the system',
    'Added new file',
    'Deleted a record',
    'Updated user permissions',
    'Viewed audit log',
    'Changed system settings',
    'Logged out',
    'Generated report'
  ];
  const action = actions[Math.floor(Math.random() * actions.length)];
  return `${action} by ${username}`;
};

// Function to generate a random date/time
const generateRandomDateTime = (index) => {
  const randomDate = subDays(new Date(), index);
  return format(randomDate, 'yyyy-MM-dd HH:mm:ss');
};

const items = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  dateTime: generateRandomDateTime(index),
  username: index % 2 === 0 ? 'Admin' : 'Super Admin',
  action: generateRandomAction(index % 2 === 0 ? 'Admin' : 'Super Admin')
}));

const ITEMS_PER_PAGE = 25;

// Utility function to join class names conditionally
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function SearchButton({ children }) {
  return (
    <button className="justify-center py-5 font-bold text-white bg-blue-500 px-11 rounded-3xl max-md:px-5">
      {children}
    </button>
  );
}

function DateRangePicker({ startDate, endDate, onClick }) {
  return (
    <div
      className="relative flex flex-col justify-center px-5 py-1.5 text-xs text-center text-black bg-white rounded-md border border-solid border-zinc-300 cursor-pointer w-[200px]"
      onClick={onClick}
    >
      <div className="justify-center px-1.5 py-1 rounded-sm bg-sky-500 bg-opacity-10">
        {startDate} - {endDate}
      </div>
    </div>
  );
}

function generateDays(month, year, startDate, endDate, today) {
  const firstDayOfMonth = startOfMonth(new Date(year, month));
  const lastDayOfMonth = endOfMonth(firstDayOfMonth);
  const startOfWeekDay = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 });
  const endOfWeekDay = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startOfWeekDay, end: endOfWeekDay }).map((date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    return {
      date: dateString,
      isCurrentMonth: isSameMonth(date, firstDayOfMonth),
      isSelected:
        (startDate && dateString === startDate) ||
        (endDate && dateString === endDate) ||
        (startDate && endDate && date >= parseISO(startDate) && date <= parseISO(endDate)),
      isToday: isSameDay(date, today),
    };
  });

  console.log('Generated days:', days);
  return days;
}

function Dropdown({ label }) {
  return (
    <div className="flex flex-col justify-center text-xs whitespace-nowrap text-neutral-800 w-[130px]">
      <div className="flex gap-5 justify-between px-3.5 py-2.5 bg-white rounded-2xl shadow-custom">
        <div>{label}</div>
        <img
          loading="lazy"
          src="/assets/Dropdownarrow.svg"
          className="shrink-0 self-center border-black border-solid aspect-[1.85] stroke-[2px] stroke-black w-auto"
          alt=""
        />
      </div>
    </div>
  );
}

function AuditSearch() {
  return (
    <main className="flex flex-col w-full px-8 py-6 bg-white rounded-2xl shadow-custom max-md:px-5">
      <form className="flex gap-5 text-sm whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <input
          id="searchInput"
          type="search"
          placeholder="Search"
          className="items-start self-start justify-center p-5 text-opacity-50 border border-solid grow rounded-3xl border-neutral-200 text-neutral-800 w-fit max-md:pr-5 max-md:max-w-full"
        />
        <SearchButton>Search</SearchButton>
      </form>
      <section className="flex self-start justify-between gap-5 mt-6">
        <AuditCalendar startDate="April, 2024" endDate="April, 2024" />
        <Dropdown label="All" />
      </section>
    </main>
  );
}

export default function AuditCalendar() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({ startDate: 'Start Date', endDate: 'End Date' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingStartDate, setIsSelectingStartDate] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date());
  const calendarRef = useRef(null);

  const fetchCurrentTime = async () => {
    try {
      const response = await axios.get('https://cors-anywhere.herokuapp.com/http://worldtimeapi.org/api/timezone/Asia/Kuala_Lumpur');
      console.log('API response:', response.data); // Log the API response
      const localDate = new Date(response.data.datetime);
      setToday(localDate);
      setCurrentMonth(localDate.getMonth());
      setCurrentYear(localDate.getFullYear());
      console.log('State updated:', localDate); // Log the updated date
    } catch (error) {
      console.error('Error fetching current time:', error);
    }
  };

  useEffect(() => {
    fetchCurrentTime();

    const interval = setInterval(fetchCurrentTime, 1000 * 60); // Update every minute to keep the calendar live
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setShowCalendar(false);
      }
    };

    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const days = generateDays(currentMonth, currentYear, startDate, endDate, today);

  const handleDateRangeClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date) => {
    if (isSelectingStartDate) {
      setStartDate(date);
      setEndDate(null);
      setIsSelectingStartDate(false);
    } else {
      if (new Date(date) < new Date(startDate)) {
        alert('End date must be after start date.');
        return;
      }
      setEndDate(date);
      setSelectedDateRange({ startDate, endDate: date });
      setShowCalendar(false);
      setIsSelectingStartDate(true);
    }
  };

  const handleMonthChange = (direction) => {
    if (direction === 'prev') {
      const newMonth = subMonths(new Date(currentYear, currentMonth), 1);
      setCurrentMonth(newMonth.getMonth());
      setCurrentYear(newMonth.getFullYear());
    } else if (direction === 'next') {
      const newMonth = addMonths(new Date(currentYear, currentMonth), 1);
      setCurrentMonth(newMonth.getMonth());
      setCurrentYear(newMonth.getFullYear());
    }
  };

  const isSelectedDate = (date) => {
    if (!startDate || !endDate) return false;
    return new Date(date) >= new Date(startDate) && new Date(date) <= new Date(endDate);
  };

  return (
    <div className="relative">
      <DateRangePicker
        startDate={selectedDateRange.startDate}
        endDate={selectedDateRange.endDate}
        onClick={handleDateRangeClick}
      />
      {showCalendar && (
        <div ref={calendarRef} className="absolute top-12 left-0 z-50 w-[300px] h-auto bg-white border border-gray-300 rounded-md shadow-custom">
          <div className="text-center lg:mt-2">
            <div className="flex items-center text-gray-900">
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => handleMonthChange('prev')}
              >
                <span className="sr-only">Previous month</span>
                <ArrowLongLeftIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold">
                {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
              </div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={() => handleMonthChange('next')}
              >
                <span className="sr-only">Next month</span>
                <ArrowLongRightIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-2 text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 gap-px mt-2 text-sm bg-gray-200 rounded-lg shadow isolate ring-1 ring-gray-200">
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    'py-1.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    isSelectedDate(day.date) && 'bg-indigo-200',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg',
                  )}
                  onClick={() => handleDateSelect(day.date)}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      day.isToday && 'bg-black text-white', // Styling for today
                      day.isSelected && !day.isToday && 'bg-indigo-500 text-white', // Styling for selected date
                      !day.isSelected && isSelectedDate(day.date) && 'bg-indigo-200', // Highlight selected range with lighter color
                    )}
                  >
                    {day.date.split('-').pop().replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AuditTrailTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(items.length / ITEMS_PER_PAGE)) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col w-full px-5 py-4 mt-5 bg-white rounded-2xl shadow-custom">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 divide-y divide-gray-200 table-fixed">
          <thead>
            <tr>
              <th scope="col" className="w-1/12 px-2 py-3 font-medium text-left border border-gray-300 text-md text-neutral-900">
                #
              </th>
              <th scope="col" className="w-2/12 px-2 py-3 font-medium text-left border border-gray-300 text-md text-neutral-900">
                Date/Time
              </th>
              <th scope="col" className="w-2/12 px-2 py-3 font-medium text-left border border-gray-300 text-md text-neutral-900">
                Username
              </th>
              <th scope="col" className="w-7/12 px-2 py-3 font-medium text-left border border-gray-300 text-md text-neutral-900">
                Action made
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedItems.map((item) => (
              <tr key={item.id}>
                <td className="px-2 py-4 text-sm border border-gray-300 whitespace-nowrap text-neutral-900">{item.id}</td>
                <td className="px-2 py-4 text-sm border border-gray-300 whitespace-nowrap text-neutral-900">{item.dateTime}</td>
                <td className="px-2 py-4 text-sm border border-gray-300 whitespace-nowrap text-neutral-900">{item.username}</td>
                <td className="px-2 py-4 text-sm border border-gray-300 whitespace-nowrap text-neutral-900">{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex items-center justify-between px-4 mt-4 border-t border-gray-200 sm:px-0">
        <div className="flex flex-1 w-0 -mt-px">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="inline-flex items-center pt-4 pr-1 text-sm font-medium border-t-2 border-transparent text-neutral-900 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon className="w-5 h-5 mr-3 text-gray-400" aria-hidden="true" />
            Previous
          </button>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {[...Array(Math.ceil(items.length / ITEMS_PER_PAGE)).keys()].map((page) => (
            <button
              key={page + 1}
              onClick={() => handlePageChange(page + 1)}
              className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
                currentPage === page + 1 ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-neutral-900 hover:text-gray-700 hover:border-gray-300'
              }`}
              aria-current={currentPage === page + 1 ? 'page' : undefined}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <div className="flex justify-end flex-1 w-0 -mt-px">
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="inline-flex items-center pt-4 pl-1 text-sm font-medium border-t-2 border-transparent text-neutral-900 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon className="w-5 h-5 ml-3 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export { AuditSearch, AuditCalendar, AuditTrailTable };
