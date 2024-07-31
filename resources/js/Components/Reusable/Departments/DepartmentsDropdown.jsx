import React, { useState } from 'react';
import './css/DepartmentsDropdown.css';
import AddCommunity from '../../../../../public/assets/AddCommunity.png';
import CreateDepartment from '../../../../../public/assets/CreateDepartment.png';
import CreateDepartments from './CreateDepartments'; 

const DepartmentDropdown = ({ departments, onSelectDepartment, onCreateDepartment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department);
    setIsOpen(false);
  };

  const toggleReportingPopup = () => setIsReportingPopupOpen(!isReportingPopupOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleCreateCommunity = () => setIsCreateCommunityOpen(!isCreateCommunityOpen);

  return (
    <div className="department-dropdown-container">
      {/* <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-500 rounded-full hover:bg-blue-700" onClick={toggleCreateCommunity}>
        <img src="/assets/plus.svg" alt="Plus icon" className="w-3 h-3 mr-2" />
        Department
      </button> */}
      {isReportingPopupOpen && (
        <button
          onClick={toggleReportingPopup}
          className="staff-popup"
          style={{
            top: '25px',
            right: '-200px',
          }}
        >
          Reporting Structure
        </button>
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
      {isCreateCommunityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute flex items-center justify-center w-10 h-10 mr-4 text-2xl text-gray-600 rounded-full top-2 right-2 hover:text-gray-900 hover:bg-slate-100"
              onClick={toggleCreateCommunity}
            >
              &times;
            </button>
            <CreateDepartments
              onCancel={toggleCreateCommunity}
              onCreate={onCreateDepartment}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentDropdown;