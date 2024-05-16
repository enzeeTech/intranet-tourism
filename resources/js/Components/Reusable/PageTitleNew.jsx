// src/Components/Reusable/PageTitle.js
import React from 'react';
import './Popup.css'; // Assuming you have a CSS file for styles

const PageTitle = ({ title, onClick }) => {
    
  return (
    <h1 className="page-title" onClick={onClick}>
      {title}
    </h1>
  );
};

export default PageTitle;
