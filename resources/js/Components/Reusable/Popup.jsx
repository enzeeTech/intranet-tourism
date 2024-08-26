import ReactDOM from 'react-dom';
import React from 'react';
import './Popup.css'; // Make sure to create the relevant CSS for styling

function IconButton({ icon, alt, onClick }) {
  return (
    <button type="button" className="shrink-0 w-6 aspect-square" onClick={onClick}>
      <img src={icon} alt={alt} />
    </button>
  );
}

const Popup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content rounded-2xl max-md:mx-8" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close w-full flex justify-end">
          <IconButton icon="/assets/cancel.svg" alt="Close icon" onClick={onClose}/>
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Popup;
