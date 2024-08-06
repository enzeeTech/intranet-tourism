import React, { useEffect, useRef } from 'react';

const PopupMenu = ({ onAssign, selectedDepartmentId, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={popupRef} className="absolute right-0 z-50 bg-white border shadow-lg w-[190px] rounded-xl -mt-3">
      <a href={`/ordering?departmentId=${selectedDepartmentId}`} className="flex items-center w-full px-4 py-2 text-sm font-extrabold text-gray-700 hover:bg-gray-100 hover:rounded-b-xl">
        Ordering
      </a>
    </div>
  );
};

export default PopupMenu;
