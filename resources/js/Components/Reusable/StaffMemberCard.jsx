import React, { useState, useRef } from 'react';
import './css/StaffMemberCard.css';
import callIcon from '../../../../public/assets/callIcon.png';
import whatsappIcon from '../../../../public/assets/whatsappIcon.png';
import threeDotsIcon from '../../../../public/assets/threeDotButton.png';
import deactivateButton from '../../../../public/assets/activatedButton.png';
import activateButton from '../../../../public/assets/deactivatedButton.png';
import phoneActiveIcon from '../../../../public/assets/phoneActiveIcon.png';
import whatsappActiveIcon from '../../../../public/assets/whatsappActiveIcon.png';
import { InertiaLink } from '@inertiajs/inertia-react';

const StaffMemberCard = ({ id, name, role, status, imageUrl, phoneNo, workNo, isDeactivated, onDeactivateClick, onActivateClick, isPopupOpen, setActivePopup, closePopup }) => {
  const threeDotButtonRef = useRef(null);
  const [isCallPopupOpen, setIsCallPopupOpen] = useState(false);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);

  const handleCall = () => {
    if (!workNo || isDeactivated) return;
  
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const fullNumber = `+6038891${workNo}`;
  
    if (isMobile) {
      window.location.href = `tel:${fullNumber}`;
    } else {
      setIsCallPopupOpen(true);
    }
  };

  const handleWhatsApp = () => {
    if (!phoneNo || isDeactivated) return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `https://wa.me/${phoneNo}`;
    } else {
      setIsWhatsAppPopupOpen(true);
    }
  };

  const closeCallPopup = () => setIsCallPopupOpen(false);
  const closeWhatsAppPopup = () => setIsWhatsAppPopupOpen(false);

  const redirectToWhatsAppWeb = () => {
    window.open(`https://web.whatsapp.com/send?phone=${phoneNo}`, '_blank');
    closeWhatsAppPopup();
  };

  const getPopupPosition = () => {
    const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
    return {
      top: buttonRect.bottom + window.scrollY - 13,
      left: buttonRect.left + window.scrollX + 75,
    };
  };

  const isPhoneNumberAvailable = () => phoneNo != null;
  const isWorkNumberAvailable = () => workNo != null;

  return (
    <div className={`staff-member-card ${isDeactivated ? 'deactivated' : ''}`}>
      <div className="card-header">
        <a href={`/user/${id}`}>
        <img 
          src={imageUrl ? `/avatar/full/${imageUrl}` : '/assets/dummyStaffPlaceHolder.jpg'} 
          alt={name} 
          className="staff-member-image" 
        />
        </a>
        <button
          className="status-button"
          onClick={() => {
            if (isDeactivated) {
              onActivateClick();
            } else {
              onDeactivateClick();
            }
          }}
          ref={threeDotButtonRef}
        >
          <img style={{ width: '40px' }} src={isDeactivated ? activateButton : deactivateButton} alt="Indicator Button" />
        </button>
      </div>
      <div className="card-body">
        <h3 className="staff-member-name">{name}</h3>
        <p className="staff-member-role">{role}</p>
        <p className={`staff-member-status ${isDeactivated ? 'deactiate-offline' : status.toLowerCase()}`}>{isDeactivated ? 'Offline' : status}</p>
      </div>
      <div className="card-footer">
        <button className={`call-button ${isWorkNumberAvailable() && !isDeactivated ? '' : 'disabled'}`} onClick={handleCall} disabled={isDeactivated || !isWorkNumberAvailable()}>
          <img src={isDeactivated ? callIcon : isWorkNumberAvailable() ? phoneActiveIcon : callIcon} alt="Call" />
        </button>
        <button className={`whatsapp-button ${isPhoneNumberAvailable() && !isDeactivated ? '' : 'disabled'}`} onClick={handleWhatsApp} disabled={isDeactivated || !isPhoneNumberAvailable()}>
          <img src={isDeactivated ? whatsappIcon : isPhoneNumberAvailable() ? whatsappActiveIcon : whatsappIcon} alt="WhatsApp" />
        </button>
      </div>
      {isCallPopupOpen && (
        <div className="bg-gray-800 bg-opacity-50 popup-backdrop" onClick={closeCallPopup}>
          <div className="popup w-[475px]" onClick={(e) => e.stopPropagation()}>
            <img src="assets/deactivatePopupClose.png" className="close-button" onClick={closeCallPopup} alt="Close" />
            <p style={{ fontSize: '16px', marginTop: '15px', marginBottom: '5px' }}>
              Call is available only on mobile.
              <br />
              Work No: +603-8891 {workNo}
            </p>
          </div>
        </div>
      )}
      {isWhatsAppPopupOpen && (
        <div className="bg-gray-800 bg-opacity-50 popup-backdrop" onClick={closeWhatsAppPopup}>
          <div className="popup w-[350px]" onClick={(e) => e.stopPropagation()}>
            {/* <img src="assets/deactivatePopupClose.png" className="close-button" onClick={closeWhatsAppPopup} alt="Close" /> */}
            <p style={{ fontSize: '16px', marginBottom: '15px', fontWeight: 'bold', marginTop: '10px' }}>Redirect to WhatsApp Web?</p>
            <div className="flex justify-center space-x-4">
              <button className="no-button" onClick={closeWhatsAppPopup}>No</button>
              <button className="yes-button" onClick={redirectToWhatsAppWeb}>Yes</button>
            </div>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default StaffMemberCard;
