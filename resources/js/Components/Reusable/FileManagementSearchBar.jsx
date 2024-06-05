import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png';
import './css/FileManagementSearchBar.css';
import './css/General.css';

const SearchFile = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="file-search-bar-container">
        <div className="file-search-bar-title">
            <h2>Search Files...</h2>
        </div>
        <div className="file-search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Search Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '1.2rem' }}
            />
            <button onClick={handleSearch}>
              <img src="assets/filesearchbutton.svg" alt="filesearchbutton" className="" />
            </button>
            <button className='pl-2'>
            <img  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09e8f0029fa709f52ac7d218876a28da6904c7ef7108cbb12df1fb413678c59c?apiKey=285d536833cc4168a8fbec258311d77b&"
                  alt=""
                  className="shrink-0 my-auto aspect-[1.45] w-[49px]" />
            </button>
        </div>
    </div>
  );
};

export default SearchFile;
