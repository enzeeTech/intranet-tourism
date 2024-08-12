import React, { useState } from 'react';
import './css/DepartmentsDropdown.css';
import AddCommunity from '../../../../../public/assets/AddCommunity.png';
import CreateDepartment from '../../../../../public/assets/CreateDepartment.png';
import CreateDepartments from './CreateCommunity'; 

const CommunityDropdown = ({ departments, onSelectDepartment, onCreateDepartment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filter, setFilter] = useState('All');
  const [isReportingPopupOpen, setIsReportingPopupOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  const handleSelect = (department) => {
    setSelectedDepartment(department);
    onSelectDepartment(department);
    setIsOpen(false);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsOpen(false);
  };

  const filteredDepartments = departments.filter((dept) => {
    if (filter === 'All') return true;
    return dept.type === filter.toLowerCase(); // Assuming dept.type is either 'public' or 'private'
  });

  const toggleReportingPopup = () => setIsReportingPopupOpen(!isReportingPopupOpen);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleCreateCommunity = () => setIsCreateCommunityOpen(!isCreateCommunityOpen);

  return (
    <div className="department-dropdown-container">
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropdown-button">
          {selectedDepartment || 'Select Community'}
        </button>
        {isOpen && (
          <ul className={`dropdown-list ${isOpen ? 'open' : ''}`}>
            <li onClick={() => handleFilterChange('All')}>All</li>
            <li onClick={() => handleFilterChange('Public')}>Public</li>
            <li onClick={() => handleFilterChange('Private')}>Private</li>
          </ul>
        )}
      </div>
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

export default CommunityDropdown;
