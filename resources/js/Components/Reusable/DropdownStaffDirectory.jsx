import React, { useState, useRef, useEffect } from 'react';
import dropDownDownArrow from '../../../../public/assets/dropdownDownArrow.png'; 
import dropDownUpArrow from '../../../../public/assets/dropdownUpArrow.png'; 
import addPersonButton from '../../../../public/assets/addPersonButton.png'; 
import visitDepartment from '../../../../public/assets/visitDepartmentButton.png'; 
import threeDotButton from '../../../../public/assets/threeDotButton.png';
import './css/DropdownStaffDirectory.css';

const DepartmentDropdown = ({ departments, onSelectDepartment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department);
    setIsOpen(false);
  };

  // Popup for showing reporting structure option which closes when clicked outside
  const toggleReportingPopup = () => setIsReportingPopupOpen(!isReportingPopupOpen);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="department-dropdown-container max-w-[1100px]">
        <button 
            className={`dropdown-header ${isOpen ? 'open' : ''}`}
            onClick={toggleDropdown}
        >
            <div className="dropdown-header-title">
                {selectedDepartment || 'Select Department'}
                <img style={{width: '15px'}} src={isOpen ? dropDownUpArrow : dropDownDownArrow} alt="Toggle Dropdown" />
            </div>
        </button>
        {selectedDepartment && (
            <button className="visit-department-btn">
            <img src={visitDepartment} alt="Visit Department" />
            </button>
        )}
        <button className="add-person-btn">
            <img src={addPersonButton} alt="Add Person" />
        </button>
        <button 
                onClick={toggleReportingPopup} 
                className="bg-blue-500 text-slate-100 staff-popup"
                // style={{
                    //     top: `25px`, 
                    //     right: `-200px`, 
                    // }}
                    >
            Reporting Structure
        </button>

        {/* <button className="three-dot-btn" onClick={toggleReportingPopup}>
            <img src={threeDotButton} alt="More Options" />
        </button> */}
        
        {/* {isReportingPopupOpen && (
            <button 
                onClick={toggleReportingPopup} 
                className="staff-popup"
                // style={{
                //     top: `25px`, 
                //     right: `-200px`, 
                // }}
            >
            Reporting Structure
            </button>
        )} */}
        {isOpen && (
            <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
            {departments.map((dept, index) => (
                <li key={index} onClick={() => handleSelect(dept)}>
                {dept}
                </li>
            ))}
            </ul>
        )}
    </div>
  );
};

export default DepartmentDropdown;
