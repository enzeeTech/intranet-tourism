import React from 'react';
import './css/DeactivateModal.css'; 
import closeModalIcon from '../../../../public/assets/deactivatePopupClose.png'; 

const DeactivateModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;


  // Stops the click inside the modal from closing it
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="deactivate-modal-backdrop">
      <div className="deactivate-modal">
        <button onClick={onClose} className="close-modal-button">
          <img src={closeModalIcon} alt="Close" />
        </button>
        <div className="modal-content">
          <h2 style={{fontSize: 20, fontWeight: 'bold', color: '#222222', fontFamily: 'Nunito Sans'}}>Deactivate?</h2>
          <div className="modal-actions">
            <button onClick={onConfirm} className="confirm-button">Yes</button>
            <button onClick={onClose} className="cancel-button">No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeactivateModal;
