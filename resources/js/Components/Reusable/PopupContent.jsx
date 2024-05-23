import React, { useState, useRef } from 'react';
import './css/StaffMemberCard.css';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
import deactivateButton from '../../../../public/assets/deactivateButton.png';
import ViewAdminPopup from '../Reusable/ViewAdminPopup';

const PopupContent = ({ name, role, status, imageUrl, onDeactivateClick, onRename, onDelete }) => {
  const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);
  const threeDotButtonRef = useRef(null);

  const toggleThreeDotButton = () => {
    setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
  };

  const closePopup = () => {
    setIsThreeDotPopupOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".popup")) {
        closePopup();
      }
    };

    if (isThreeDotPopupOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isThreeDotPopupOpen]);

  const handleIconClick = (e) => {
    e.stopPropagation();
    toggleThreeDotButton();
  };

  const getPopupPosition = () => {
    return {
      top: -8,
      left: 90.5,
    };
  };

  const handleRenameClick = (e) => {
    e.stopPropagation();
    setIsRenaming(true);
  };

  const handleRenameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleRenameSubmit = (e) => {
    e.preventDefault();
    onRename(newName);
    setIsRenaming(false);
    closePopup();
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
    // Implement your download logic here
    console.log('Download clicked');
  };

  return (
    <div>
      <button
        className="three-dot-button"
        onClick={toggleThreeDotButton}
        ref={threeDotButtonRef}
      >
        <img style={{ width: '40px' }} src={threeDotsIcon} alt="Three dots" onClick={handleIconClick} />
      </button>
      {isThreeDotPopupOpen && (
        <div className="profile-files-popup text-sm">
          <div
            className="staff-member-popup4"
            style={{
              top: `${getPopupPosition().top}px`,
              left: `${getPopupPosition().left}px`,
              position: 'absolute',
              zIndex: 999,
            }}
          >
            {isRenaming ? (
              <form onSubmit={handleRenameSubmit}>
                <input
                  type="text"
                  value={newName}
                  onChange={handleRenameChange}
                  className="text-neutral-500 pr-2 mr-12"
                />
                <button type="submit" className="text-neutral-500 pr-2 mr-12">Save</button>
              </form>
            ) : (
              <button
                className="text-neutral-500 pr-2 mr-12"
                onClick={handleRenameClick}
              >
                Rename
              </button>
            )}
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
            <button
              className="text-neutral-500 pr-2 mr-8"
              onClick={handleDownload}
            >
              Download
            </button>
          </div>
        </div>
      )}
      {isAdminPopupOpen && <ViewAdminPopup onClose={closeAdminPopup} />}
    </div>
  );
};

export default PopupContent;
