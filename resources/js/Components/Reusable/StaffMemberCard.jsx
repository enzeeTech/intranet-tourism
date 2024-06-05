import React, {useState, useRef} from 'react';
import './css/StaffMemberCard.css'; 
import callIcon from '../../../../public/assets/callIcon.png'; 
import whatsappIcon from '../../../../public/assets/whatsappIcon.png';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
import dummyStaffImage from '../../../../public/assets/dummyStaffImage.png';
import deactivateButton from '../../../../public/assets/deactivateButton.png';


const StaffMemberCard = ({ name, role, status, imageUrl, phoneNo, onDeactivateClick, isPopupOpen, setActivePopup, closePopup }) => {

    // const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
    const threeDotButtonRef = useRef(null);
    const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
    const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);

    // Handle call button click
    const handleCall = () => {
        if (!phoneNo) return;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `tel:${phoneNo}`;
        } else {
            setIsCallPopupOpen(true);
        }
    };

    // Handle WhatsApp button click
    const handleWhatsApp = () => {
        if (!phoneNo) return;

        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            window.location.href = `https://wa.me/${phoneNo}`;
        } else {
            setIsWhatsAppPopupOpen(true);
        }
    };

    // Close call and whatsapp popup
    const closeCallPopup = () => setIsCallPopupOpen(false);
    const closeWhatsAppPopup = () => setIsWhatsAppPopupOpen(false);

    // Redirent to WhatsApp Web
    const redirectToWhatsAppWeb = () => {
        window.open(`https://web.whatsapp.com/send?phone=${phoneNo}`, '_blank');
        closeWhatsAppPopup();
    };

    // // Three dot button on click function to create a popup modal
    // const toggleThreeDotButton = () => {
    //     setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
    // }

    // // Open deactivate option modal
    // const openDeactivateModal = () => {
    //     setIsThreeDotPopupOpen(false);
    //     onDeactivateClick();
    // };

    // Position popup below the three-dot button
    const getPopupPosition = () => {
        const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
        return {
            top: buttonRect.bottom + window.scrollY - 13,
            left: buttonRect.left + window.scrollX + 75,
        };
    };

    return (
        <div className="staff-member-card">
            <div className="card-header">
                <img src={dummyStaffImage} alt={name} className="staff-member-image" />
                <button 
                    className="three-dot-button" 
                    // onClick={toggleThreeDotButton}
                    // ref={threeDotButtonRef}
                    onClick={() => {
                        if (isPopupOpen) {
                            closePopup();
                        } else {
                            setActivePopup();
                        }
                    }}
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
                <button className="call-button" onClick={handleCall}>
                    <img style={{width: '20px', height: '20px'}} src={callIcon} alt="Call" />
                </button>
                <button className="whatsapp-button" onClick={handleWhatsApp}>
                    <img style={{width: '20px', height: '20px'}} src={whatsappIcon} alt="WhatsApp" />
                </button>
            </div>
            {/* {isThreeDotPopupOpen && (
                <button 
                    onClick={openDeactivateModal} 
                    className="staff-member-popup"
                    style={{
                        top: `${getPopupPosition().top}px`, 
                        left: `${getPopupPosition().left}px`,
                    }}
                >
                    <img src={deactivateButton} alt={name} className="staff-member-popup-image" />
                    <p className="staff-member-popup-text">Deactivate</p>
                </button>
            )} */}
            {isPopupOpen && (
                <button 
                    id={`staff-popup-${name}`} // Unique ID for the popup
                    onClick={onDeactivateClick} 
                    className="staff-member-popup"
                    style={{
                        top: `${getPopupPosition().top}px`, 
                        left: `${getPopupPosition().left}px`,
                    }}
                >
                    <img src={deactivateButton} alt={name} className="staff-member-popup-image" />
                    <p className="staff-member-popup-text">Deactivate</p>
                </button>
            )}
            {isCallPopupOpen && (
                <div className="popup-backdrop" onClick={closeCallPopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <p style={{fontSize: '25px'}}>Call is available only on mobile.</p>
                    </div>
                </div>
            )}
            {isWhatsAppPopupOpen && (
                <div className="popup-backdrop" onClick={closeWhatsAppPopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <p style={{fontSize: '20px', marginBottom: '15px', fontWeight: 'bold'}}>Redirect to WhatsApp Web?</p>
                        <button className="yes-button" onClick={redirectToWhatsAppWeb}>Yes</button>
                        <button className="no-button" onClick={closeWhatsAppPopup}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffMemberCard;
