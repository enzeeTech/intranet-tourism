import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png'; 
import filterIcon from '../../../../public/assets/staffListButton.png'; 
import './css/StaffDirectorySearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="staff-search-bar-container">
        <div className="staff-search-bar-title">
            <h2>Search Members...</h2>
        </div>
        <div className="staff-search-bar">
            <input
                type="text"
                className="staff-search-input"
                placeholder="Search Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>
                <img src={searchIcon} alt="Search" className="staff-search-btn-img" />
            </button>
            <button >
                <img src={filterIcon} alt="Filter" className="staff-filter-btn-img" />
            </button>
        </div>
    </div>
  );
};

export default SearchBar;
