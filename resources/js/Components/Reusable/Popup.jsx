// src/Components/Reusable/Popup.js
import React from 'react';
import './Popup.css'; // Make sure to create the relevant CSS for styling


const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay " onClick={onClose}>
      <div className="popup-content " onClick={(e) => e.stopPropagation()}>
        <button className="popup-close " onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;