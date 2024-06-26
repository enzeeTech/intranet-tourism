import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png'; 
import staffListIconActive from '../../../../public/assets/staffListButton.png'; 
import staffListIconInactive from '../../../../public/assets/staffListButtonInactive.png';
import orgChartIconInactive from '../../../../public/assets/orgChartInactive.png';
import orgChartIconActive from '../../../../public/assets/orgChartActive.png';
import './css/StaffDirectorySearchBar.css';
import './css/General.css';

const SearchBar = ({ onSearch, handleStaffListButton, handleOrgChartButton, isStaffListActive, isOrgChartActive }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(searchTerm);
  };


  return (
    <div className="staff-search-bar-container max-w-[1100px] p-4 bg-white rounded-2xl shadow-custom mb-5">
      <div className="mb-1 staff-search-bar-title">
        <h2 className="text-xl font-semibold">Search Members...</h2>
      </div>
      <div className="flex flex-col items-center space-y-3 staff-search-bar sm:flex-row sm:space-y-0 sm:space-x-3">
        <input
            type="text"
            className="flex-grow w-full p-3 border border-[#E4E4E4] rounded-full search-input sm:w-auto"
            placeholder="Search Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex w-full space-x-3 sm:justify-end sm:w-auto">
              <button onClick={handleSearch} style={{ height: 'auto', width: '123px'}}>
                  <img src={searchIcon} alt="Search" />
              </button>
              <button onClick={handleStaffListButton} style={{ width: '60px', paddingTop: '3px', marginLeft: '-5px'}}>
                  <img src={isStaffListActive ? staffListIconActive : staffListIconInactive} alt="Staff List"   />
              </button>
              <button onClick={handleOrgChartButton} style={{width: '60px', paddingTop: '3px', marginLeft: '-15px'}}>
                  <img src={isOrgChartActive ? orgChartIconActive : orgChartIconInactive} alt="Org Chart"  />
              </button>
            </div>
        </div>
    </div>
  );
};

export default SearchBar;
