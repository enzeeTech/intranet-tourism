import React, { useState } from 'react';
import './css/DepartmentsDropdown.css';
import AddCommunity from '../../../../../public/assets/AddCommunity.png';
import CreateDepartment from '../../../../../public/assets/CreateDepartment.png';
import CreateDepartments from './CreateDepartments'; // Adjust the path as necessary

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
      <button className="text-sm px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700" onClick={toggleCreateCommunity}>
        Create Department +
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
        <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
          {departments.map((dept, index) => (
            <li key={index} onClick={() => handleSelect(dept)}>
              {dept}
            </li>
          ))}
        </ul>
      )}
      {isCreateCommunityOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <button
              className="absolute top-2 right-2 mr-4 text-gray-600 hover:text-gray-900 hover:bg-slate-100 text-2xl rounded-full  w-10 h-10 flex justify-center items-center"
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
