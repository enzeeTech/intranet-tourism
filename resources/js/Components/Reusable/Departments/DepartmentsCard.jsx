import React from 'react';
import '../css/CommunityCard.css'; 
import defaultImage from '../../../../../public/assets/dummyStaffImage.png';

const DepartmentsCard = ({ name, role, imageUrl, onDeactivateClick }) => {
  return (
    <div className="staff-member-card">
      <div className="card-header">
        <img src={imageUrl || defaultImage} alt={name} className="staff-member-image" />
      </div>
      <div className="card-body">
        <h3 className="staff-member-name">{name}</h3>
        <p className="staff-member-role">Followed by</p>
      </div>
      <div className="card-footer">
        <button 
          className="justify-center px-5 bg-white rounded-3xl border border-solid border-neutral-400" 
          aria-label="Visit"
          onClick={onDeactivateClick}
        >
          Visit
        </button>
      </div>
    </div>
  );
};

export default DepartmentsCard;
