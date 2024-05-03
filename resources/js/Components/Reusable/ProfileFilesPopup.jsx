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

    const openDeactivateModal = () => {
        setIsThreeDotPopupOpen(false);
        onDeactivateClick();
    };

    // Position popup next to the three dots icon button
    const getPopupPosition = () => {
        // const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
        return {
            top: -7,
            left: 75, // Add an offset to position it to the right of the button
        };
    };

    return (
        <div>
            <button
                className="three-dot-button"
                onClick={toggleThreeDotButton}
                ref={threeDotButtonRef}
            >
                <img style={{ width: '40px' }} src={threeDotsIcon} alt="Three dots" />
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
                    <img src="assets/🦆 icon _image_.png" alt={name} className="staff-member-popup-image" />
                    <p className="text-neutral-500 pr-11 -ml-1.5">Delete</p>
                </div>
                <div
                className="staff-member-popup3"
                style={{
                    top: '34px',
                    left: `${getPopupPosition().left}px`,
                    position: 'absolute',
                    zIndex: 999, // Ensure it's above other elements
                }}
            >
                <img src="assets/🦆 icon _lock_.png" alt={name} className="staff-member-popup-image" />
                <p className="text-neutral-500 pr-4 -ml-1.5">Download</p>
            </div>
            </div>
            )}
        </div>
    );
};

export default PopupContent;
