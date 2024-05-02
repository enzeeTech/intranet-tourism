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
            top: 10,
            left: 100, // Add an offset to position it to the right of the button
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
                <div
                    className="staff-member-popup"
                    style={{
                        top: `${getPopupPosition().top}px`,
                        left: `${getPopupPosition().left}px`,
                        position: 'absolute',
                        zIndex: 999, // Ensure it's above other elements
                    }}
                >
                    <img src={deactivateButton} alt={name} className="staff-member-popup-image" />
                    <p className="staff-member-popup-text">Deactivate</p>
                </div>
            )}
        </div>
    );
};

export default PopupContent;
