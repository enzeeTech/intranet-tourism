import React from 'react';
import './css/DepartmentsCard.css';
import defaultImage from '../../../../../public/assets/dummyStaffImage.png';

const DepartmentsCard = ({ name, role, imageUrl, onDeactivateClick, departmentID }) => {
  return (
    <div className="staff-member-card">
      <div className="card-header">
        <img src={imageUrl || defaultImage} alt={name} className="staff-member-image" />
      </div>
      <div className="card-body">
        <h3 className="staff-member-name">{name}</h3>
      </div>
      <div className="card-footer">
      <a href={`/departmentInner?departmentId=${departmentID}`}>
        <button
          className="justify-center px-5 bg-white border border-solid rounded-3xl border-neutral-400"
          aria-label="Visit"
          onClick={onDeactivateClick}
        >
          Visit
        </button>
        </a>
      </div>
    </div>
  );
};

export default DepartmentsCard;
