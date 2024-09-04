import React, { useState } from 'react';
import PopupMenu from './PopupMenu'; 

const ThreeDotButton = ({ selectedDepartmentId }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleAssign = () => {
    console.log('Reporting Structure');
    setIsPopupOpen(false);
  };

  return (
    <div className="">
      <button onClick={togglePopup} className="p-2">
        <img src="/assets/threedots.svg" alt="Menu" className="h-5 w-[50px]" />
      </button>
      {isPopupOpen && (
        <PopupMenu onAssign={handleAssign} selectedDepartmentId={selectedDepartmentId} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default ThreeDotButton;
