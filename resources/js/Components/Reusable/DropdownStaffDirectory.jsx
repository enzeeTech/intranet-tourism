import React, { useState, useRef, useEffect } from 'react';
import dropDownDownArrow from '../../../../public/assets/dropdownDownArrow.png'; 
import dropDownUpArrow from '../../../../public/assets/dropdownUpArrow.png'; 
import visitDepartment from '../../../../public/assets/visitDepartmentButton.png'; 
import threeDotButton from '../../../../public/assets/threeDotButton.png';
import './css/DropdownStaffDirectory.css';
import { set } from 'date-fns';

const DepartmentDropdown = ({ departments, onSelectDepartment, staffMembers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState({ id: '', name: '' });
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  console.log('staffMembers', staffMembers)

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department.id);
    setIsOpen(false);
    setSearchTerm(department.name);
  };

  const toggleReportingPopup = () => {
    setIsReportingPopupOpen(!isReportingPopupOpen);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsReportingPopupOpen(false);
  
    if (isOpen && selectedDepartment.id) {
      setSearchTerm(selectedDepartment.name);
    } else {
      setSearchTerm('');
    }
  
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      if (selectedDepartment.name) {
        setSearchTerm(selectedDepartment.name);
      } else {
        setSearchTerm('');
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="department-dropdown-container" ref={dropdownRef}>
      <div className={`dropdown-header ${isOpen ? 'open' : ''}`}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={toggleDropdown}
          placeholder="Select Department"
          className="dropdown-header-input"
        />
        <img style={{ width: '15px' }} src={isOpen ? dropDownUpArrow : dropDownDownArrow} alt="Toggle Dropdown" />
      </div>
      {isOpen && (
        <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
          {filteredDepartments.map((dept) => (
            <li key={dept.id} onClick={() => handleSelect(dept)}>
              {dept.name}
            </li>
          ))}
        </ul>
      )}
      {selectedDepartment.id && (
        <a href={`/departmentInner?departmentId=${selectedDepartment.id}`}>
          <button className="visit-department-btn">
            <img src={visitDepartment} alt="Visit Department" />
          </button>
        </a>
      )}
      {selectedDepartment.id && (
      <button className="three-dot-btn" onClick={toggleReportingPopup}>
        <img src={threeDotButton} alt="More Options" />
      </button>
      )}
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
            href={`/ordering?staffMembers=${encodeURIComponent(JSON.stringify(staffMembers))}`}
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
