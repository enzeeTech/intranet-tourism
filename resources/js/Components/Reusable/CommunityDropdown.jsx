import React, { useState } from 'react';
import MyComponent from './AddCommunity'; // Import your modal component
import dropDownDownArrow from '../../../../public/assets/dropdownDownArrow.png'; 
import dropDownUpArrow from '../../../../public/assets/dropdownUpArrow.png'; 
import addPersonButton from '../../../../public/assets/addPersonButton.png'; 
import visitDepartment from '../../../../public/assets/visitDepartmentButton.png'; 
import threeDotButton from '../../../../public/assets/threeDotButton.png';
import './css/DropdownStaffDirectory.css';
import AddCommunity from '../../../../public/assets/AddCommunity.png'

const DepartmentDropdown = ({ departments, onSelectDepartment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);
  const [communityType, setCommunityType] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityAdminName, setCommunityAdminName] = useState('');
  const [invitePeopleInput, setInvitePeopleInput] = useState('');

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department);
    setIsOpen(false);
  };

  const toggleReportingPopup = () => setIsReportingPopupOpen(!isReportingPopupOpen);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddCommunityPopup = () => {
    setIsOpen(!isOpen);
  };

  const handleAddCommunity = () => {
    // Logic to add the community here
    // You can use communityType, communityName, communityAdminName, and invitePeopleInput
    // Clear the input fields and close the popup modal
    setCommunityType('');
    setCommunityName('');
    setCommunityAdminName('');
    setInvitePeopleInput('');
    setIsOpen(false);
  };

  return (
    <div className="department-dropdown-container">
        <button 
            className={`dropdown-header ${isOpen ? 'open' : ''}`}
            onClick={toggleDropdown}
        >
            <div className="dropdown-header-title">
              {selectedDepartment || 'All'}
              <img style={{width: '15px'}} src={isOpen ? dropDownUpArrow : dropDownDownArrow} alt="Toggle Dropdown" />
            </div>
        </button>
        {selectedDepartment && (
            <button className="visit-department-btn">
                <img src={visitDepartment} alt="Visit Department" />
            </button>
        )}
        <button className="add-person-btn" onClick={toggleAddCommunityPopup}>
            <img src={AddCommunity} alt="Add Community" />
        </button>
        <button className="three-dot-btn" onClick={toggleReportingPopup}>
            <img src={threeDotButton} alt="More Options" />
        </button>
        {isReportingPopupOpen && (
            <button 
                onClick={toggleReportingPopup} 
                className="staff-popup"
                style={{
                    top: `25px`, 
                    right: `-200px`, 
                }}
            >
            Reporting Structure
            </button>
        )}
        {isOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <MyComponent
                    communityType={communityType}
                    setCommunityType={setCommunityType}
                    communityName={communityName}
                    setCommunityName={setCommunityName}
                    communityAdminName={communityAdminName}
                    setCommunityAdminName={setCommunityAdminName}
                    invitePeopleInput={invitePeopleInput}
                    setInvitePeopleInput={setInvitePeopleInput}
                    handleAddCommunity={handleAddCommunity}
                />
              </div>
            </div>
        )}
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
