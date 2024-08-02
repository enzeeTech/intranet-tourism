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
    <div className="relative">
      <button onClick={togglePopup} className="ml-[370px] mt-1 right-0 p-2">
        <img src="/assets/threeDotButton.png" alt="Menu" className="w-12 h-8" />
      </button>
      {isPopupOpen && (
        <PopupMenu onAssign={handleAssign} selectedDepartmentId={selectedDepartmentId} onClose={() => setIsPopupOpen(false)} />
      )}
    </div>
  );
};

export default ThreeDotButton;
