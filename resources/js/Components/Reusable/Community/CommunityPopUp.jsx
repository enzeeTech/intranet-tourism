import React, { useRef, useEffect, useState } from 'react';

const PopupMenu = ({ onArchiveToggle, selectedDepartmentId, onClose, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);
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

  const handleDeleteClick = () => {
    setShowConfirm(true); // Show the confirmation popup
  };

  const handleConfirmDelete = () => {
    onDelete(selectedDepartmentId); // Call the delete function with the department ID
    setShowConfirm(false); // Hide the confirmation popup
    onClose(); // Close the popup menu
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Hide the confirmation popup
  };

  return (
    <div ref={popupRef} className="relative z-50">
      <div className="absolute right-0 z-50 bg-white border shadow-lg w-[190px] rounded-xl -mt-20">
        <button
          onClick={() => {
            onArchiveToggle(selectedDepartmentId); // Call the archive toggle with the department ID
            onClose(); // Close the popup after action
          }}
          className="flex items-center w-full px-4 py-2 text-sm font-extrabold text-gray-700 hover:bg-gray-100 hover:rounded-t-xl"
        >
          Archive / Unarchive
        </button>
        <button
          onClick={handleDeleteClick} // Show the confirmation popup
          className="flex items-center w-full px-4 py-2 text-sm font-extrabold text-gray-700 hover:bg-gray-100 hover:rounded-b-xl"
        >
          Delete
        </button>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-lg">Are you sure you want to delete this community?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMenu;
