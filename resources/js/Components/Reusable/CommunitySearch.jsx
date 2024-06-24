import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png';
import filterIcon from '../../../../public/assets/staffListButton.png';
import './css/StaffDirectorySearchBar.css';
import './css/General.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="staff-search-bar-container">
        <div className="staff-search-bar-title">
            <h2>Search Community...</h2>
        </div>
        <div className="staff-search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '1.2rem' }}
            />
            <button onClick={handleSearch}>
                <img src={searchIcon} alt="Search" className="staff-search-btn-img" />
            </button>
        </div>
    </div>
  );
};

export default SearchBar;
