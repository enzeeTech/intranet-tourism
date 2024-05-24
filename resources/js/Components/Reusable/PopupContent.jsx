import React, { useState, useRef, useEffect } from 'react';
import './css/StaffMemberCard.css';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
import ViewAdminPopup from '../Reusable/ViewAdminPopup';

const PopupContent = ({ name, role, status, imageUrl, onDeactivateClick, onRename, onDelete }) => {
  const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const threeDotButtonRef = useRef(null);
  const popupRef = useRef(null);
  const renamePopupRef = useRef(null);

  const toggleThreeDotButton = () => {
    setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
  };

  const closePopup = () => {
    setIsThreeDotPopupOpen(false);
  };

  const closeRenamePopup = () => {
    setIsRenaming(false);
    setNewName(name); // Reset the new name to the original name
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current && !popupRef.current.contains(event.target) &&
        threeDotButtonRef.current && !threeDotButtonRef.current.contains(event.target) &&
        (!renamePopupRef.current || !renamePopupRef.current.contains(event.target))
      ) {
        closePopup();
      }
    };

    if (isThreeDotPopupOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isThreeDotPopupOpen]);

  const handleIconClick = (e) => {
    e.stopPropagation();
    toggleThreeDotButton();
  };

  const handleRenameClick = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
    setIsThreeDotPopupOpen(false); // Close the three-dot popup when renaming starts
  };

  const handleRenameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    onRename(newName);
    setIsRenaming(false);
  };

  const handleCancelRename = () => {
    closeRenamePopup();
  };

  const handleManageAdminClick = (e) => {
    e.stopPropagation();
    setIsAdminPopupOpen(true);
  };

  const closeAdminPopup = () => {
    setIsAdminPopupOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
    closePopup();
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const qrImage = 'assets/hehe.png';
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  const getPopupPosition = () => {
    return {
      top: -8,
      left: 90.5,
    };
  };

  return (
    <div>
      <button
        className="three-dot-button"
        onClick={handleIconClick}
        ref={threeDotButtonRef}
      >
        <img style={{ width: '40px' }} src={threeDotsIcon} alt="Three dots" />
      </button>
      {isThreeDotPopupOpen && (
        <div className="profile-files-popup text-sm" ref={popupRef}>
          <div
            className="staff-member-popup4"
            style={{
              top: `${getPopupPosition().top}px`,
              left: `${getPopupPosition().left}px`,
              position: 'absolute',
              zIndex: 999,
            }}
          >
            <img src="assets/🦆 icon _Rename.svg" alt={name} className="staff-member-popup-image" />
            <button
              className="text-neutral-500 pr-2 mr-12"
              onClick={handleRenameClick}
            >
              Rename
            </button>
          </div>
          <div
            className="staff-member-popup2"
            style={{
              top: '33.5px',
              left: `${getPopupPosition().left}px`,
              position: 'absolute',
              zIndex: 999,
            }}
          >
            <img src="assets/🦆 icon _image_.svg" alt={name} className="staff-member-popup-image" />  
            <button
              className="text-neutral-500 pr-2 mr-14"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <div
            className="staff-member-popup5"
            style={{
              top: '74.8px',
              left: `${getPopupPosition().left}px`,
              position: 'absolute',
              zIndex: 999,
            }}
          >
            <img src="assets/🦆 icon _Admin.svg" alt={name} className="staff-member-popup-image" />
            <button
              className="text-neutral-500 pr-2"
              onClick={handleManageAdminClick}
            >
              Manage Admin
            </button>
          </div>
          <div
            className="staff-member-popup3"
            style={{
              top: '116.5px',
              left: `${getPopupPosition().left}px`,
              position: 'absolute',
              zIndex: 999,
            }}
          >
            <img src="assets/🦆 icon _lock_.svg" alt={name} className="staff-member-popup-image" />
            <button
              className="text-neutral-500 pr-2 mr-8"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      )}
      {isRenaming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={renamePopupRef} className="relative bg-white rounded-xl shadow-custom p-6 w-[300px]">
            <h2 className="text-xl font-bold mb-4">Rename</h2>
            <form onSubmit={handleRenameSubmit} className="flex flex-col">
              <input
                type="text"
                value={newName}
                onChange={handleRenameChange}
                className="text-neutral-500 pr-2 mb-4 p-2 border border-gray-300 rounded"
              />
              <div className="flex gap-2 justify-end">
                <button type="button" className="text-neutral-500 border border-gray-300 px-4 py-2 rounded" onClick={handleCancelRename}>Cancel</button>
                <button type="submit" className="text-white bg-blue-500 px-4 py-2 rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAdminPopupOpen && <ViewAdminPopup onClose={closeAdminPopup} />}
    </div>
  );
};

export default PopupContent;
