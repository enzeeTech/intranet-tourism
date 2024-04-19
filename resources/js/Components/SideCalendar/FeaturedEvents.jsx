import React from 'react';

function FeaturedEvent({ date, title, time }) {
    const [day, month] = date.split(" ");
  
    const handleMoreClick = () => { 
      
      console.log('More clicked!');
      // Add more code here to perform specific actions, like opening a modal or navigating to a new page 
      window.location.href = 'https://www.example.com/';
    };
  
    return (
      <div className="flex gap-3 p-2 border-b border-l-gray-200">
        <div className="flex flex-col pb-2.5 font-bold text-center whitespace-nowrap bg-red-500 rounded-lg shadow-sm h-[64px] w-[54px]">
          <div className="justify-center px-5 py-3 text-xs bg-white rounded-t-md text-neutral-800">
            {day}
          </div>
          <div className="self-center mt-1 text-xs text-white uppercase">
            {month}
          </div>
        </div>
        <div className="flex flex-col self-start text-sm font-semibold">
          <div className="font-bold text-neutral-800">{title}</div>
          <div className="mt-.5 text-neutral-400">{time}</div>
          {/* Make the "More" text clickable */}
          <div
            className="mt-2.5 text-xs text-sky-500 underline cursor-pointer"
            onClick={handleMoreClick} // Attach the click event handler 
          > 
            More
          </div>
        </div>
      </div>
    );
}

export default FeaturedEvent;