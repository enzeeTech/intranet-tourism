import React, { useState, useRef } from 'react';
import './css/StaffMemberCard.css';
// import DeactivateModal from './DeactivateModal';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
// import dummyStaffImage from '../../../../public/assets/dummyStaffImage.png';
import deactivateButton from '../../../../public/assets/deactivateButton.png';

const PopupContent = ({ name, role, status, imageUrl, onDeactivateClick }) => {

    const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
    const threeDotButtonRef = useRef(null);

    const toggleThreeDotButton = () => {
        setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
    }

    const openPopup = () => {
        setIsThreeDotPopupOpen(true);
        console.log("bukak");
      };

    const closePopup = () => {
        setIsThreeDotPopupOpen(false);
        console.log("tutup");
      };

    const openDeactivateModal = () => {
        setIsThreeDotPopupOpen(false);
        onDeactivateClick();
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

    // Position popup next to the three dots icon button
    const getPopupPosition = () => {
        // const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
        return {
            top: -8,
            left: 75, // Add an offset to position it to the right of the button
        };
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Delete button clicked");
        // Here, you would typically call a function to handle the actual delete operation.
    };
    
    // Define the onClick handler for downloading an item
    const handleDownload = (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log("Download button clicked");
        // Here, you would typically call a function to handle the actual download operation.
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
                <div className="profile-files-popup">
                    <div
                        className="staff-member-popup2"
                        style={{
                            top: `${getPopupPosition().top}px`,
                            left: `${getPopupPosition().left}px`,
                            position: 'absolute',
                            zIndex: 999, // Ensure it's above other elements
                        }}
                    >
                        <img src="assets/🦆 icon _image_.svg" alt={name} className="staff-member-popup-image" />
                        <button
                            className="text-neutral-500 pr-11 -ml-1.5"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                    <div
                        className="staff-member-popup3"
                        style={{
                            top: '33px',
                            left: `${getPopupPosition().left}px`,
                            position: 'absolute',
                            zIndex: 999, // Ensure it's above other elements
                        }}
                    >
                        <img src="assets/🦆 icon _lock_.svg" alt={name} className="staff-member-popup-image" />
                        <button
                            className="text-neutral-500 pr-4 -ml-1.5"
                            onClick={handleDownload}
                        >
                            Download
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
    
};

export default PopupContent;
