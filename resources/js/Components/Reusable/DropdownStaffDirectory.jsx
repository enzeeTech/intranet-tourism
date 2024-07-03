import React, { useState, useRef, useEffect } from 'react';
import dropDownDownArrow from '../../../../public/assets/dropdownDownArrow.png'; 
import dropDownUpArrow from '../../../../public/assets/dropdownUpArrow.png'; 
import addPersonButton from '../../../../public/assets/addPersonButton.png'; 
import visitDepartment from '../../../../public/assets/visitDepartmentButton.png'; 
import threeDotButton from '../../../../public/assets/threeDotButton.png';
import './css/DropdownStaffDirectory.css';

const DepartmentDropdown = ({ departments, onSelectDepartment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({ id: '', name: '' });
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department.id);
    setIsOpen(false);
  };

  // Popup for showing reporting structure option which closes when clicked outside
  const toggleReportingPopup = () => {
    setIsReportingPopupOpen(!isReportingPopupOpen);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsReportingPopupOpen(false);
    setIsOpen(!isOpen);
  };

  return (
    <div className="department-dropdown-container max-w-[1100px]">
      <button 
        className={`dropdown-header ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
      >
        <div className="dropdown-header-title">
          {selectedDepartment.name || 'Select Department'}
          <img style={{width: '15px'}} src={isOpen ? dropDownUpArrow : dropDownDownArrow} alt="Toggle Dropdown" />
        </div>
      </button>
      {isOpen && (
        <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
          {departments.map((dept) => (
            <li key={dept.id} onClick={() => handleSelect(dept)}>
              {dept.name}
            </li>
          ))}
        </ul>
      )}
      {selectedDepartment.id && (
        <button className="visit-department-btn">
          <img src={visitDepartment} alt="Visit Department" />
        </button>
      )}
      {/* <button className="add-person-btn">
          <img src={addPersonButton} alt="Add Person" />
      </button> */}
      <button className="hidden three-dot-btn sm:block" onClick={toggleReportingPopup}>
        <img src={threeDotButton} alt="More Options" />
      </button>
      {isReportingPopupOpen && (
        <div 
          className="staff-popup"
          style={{
            marginTop: `95px`,
            marginRight: `20px`,
            zIndex: 10,
          }}
        >
          <button 
            onClick={toggleReportingPopup} 
            className="popup-button"
          >
            Reporting Structure
          </button>
          <hr className="popup-divider" />
          <a 
            href="/ordering" 
            className="popup-button"
          >
            Ordering
          </a>
        </div>
      )}
    </div>
  );
};

export default DepartmentDropdown;
