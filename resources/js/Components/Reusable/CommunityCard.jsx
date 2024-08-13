import React, {useState, useRef} from 'react';
import './css/CommunityCard.css'; 
// import DeactivateModal from './DeactivateModal';
// import callIcon from '../../../../public/assets/callIcon.png'; 
// import whatsappIcon from '../../../../public/assets/whatsappIcon.png';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
import Image from '../../../../public/assets/Image.png';
// import Massage from '../../../../public/assets/Massage.png'
// import dummyStaffImage from '../../../../public/assets/dummyStaffImage.png';
// import deactivateButton from '../../../../public/assets/deactivateButton.png';



const StaffMemberCard = ({ name, role, imageUrl, onDeactivateClick }) => {

    const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
    const threeDotButtonRef = useRef(null);

    // Placeholder functions for call and WhatsApp buttons
    const handleCall = () => console.log('Call button clicked');
    const handleWhatsApp = () => console.log('WhatsApp button clicked');

    // three dot button on click function to create a popup modal
    const toggleThreeDotButton = () => {
        setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
    }

    const openDeactivateModal = () => {
        setIsThreeDotPopupOpen(false);
        onDeactivateClick();
    };

    // Position popup below the three-dot button
    const getPopupPosition = () => {
        const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
        return {
            top: buttonRect.bottom + window.scrollY - 13,
            left: buttonRect.left + window.scrollX + 75,
        };
    };

    return (
        <div className="staff-member-card" >
            <div className="card-header">
                <img src={Image} alt={name} className="staff-member-image" />
                <button 
                    className="three-dot-button" 
                    onClick={toggleThreeDotButton}
                    ref={threeDotButtonRef}
                >
                <img style={{width: '40px'}} src={threeDotsIcon} alt="Three dots" />
                </button>
            </div>
            <div className="card-body">
                <h3 className="staff-member-name">{name}</h3>
                <p className="staff-member-role">{role}</p>
                <p className={`staff-member-status ${status.toLowerCase()}`}>{status}</p>
            </div>
            <div className="card-footer">
            <a href="/departmentInner">
                <button
                    className="justify-center px-5 bg-white ml-12 rounded-3xl border border-solid border-neutral-400"
                    aria-label="Visit"
                >
                    Visit
                </button>
            </a>
            </div>
            {isThreeDotPopupOpen && (
            <button 
                onClick={openDeactivateModal} 
                className="staff-member-popup"
                style={{
                    top: `${getPopupPosition().top}px`, 
                    left: `${getPopupPosition().left}px`,
                }}
            >
                {/* <img src={deactivateButton} alt={name} className="staff-member-popup-image" /> */}
                <p className="staff-member-popup-text">Deactivate</p>
            </button>
            )}
        </div>
    );
};

export default StaffMemberCard;
