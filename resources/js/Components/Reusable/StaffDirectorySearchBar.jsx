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
    <div className="staff-search-bar-container max-w-[1100px]">
        <div className="staff-search-bar-title ">
            <h2>Search Members...</h2>
        </div>
        <div className="staff-search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '1.2rem', fontFamily: "Nunito Sans" }}
            />
            <div style={{display: 'flex'}}>
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
