import React, { useState } from 'react';
import searchIcon from '../../../../public/assets/searchStaffButton.png';
import './css/FileManagementSearchBar.css';
import './css/General.css';

const SearchFile = ({ onSearch, requiredData, onFileUploaded }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Call the parent's setSearchTerm to filter the table
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setShowPopup(true);
    event.target.value = null;
  };

  const handleFileUpload = async () => {
    // Handle file upload logic here...
  };

  const handleFileDelete = () => {
    setFile(null);
    setShowPopup(false);
  };

  const CancelButton = ({ onClick }) => (
    <button
      className="self-end px-4 py-3 text-base font-bold whitespace-nowrap rounded-2xl border border-solid border-stone-300 text-neutral-400"
      onClick={onClick}
    >
      Cancel
    </button>
  );

  return (
    <div className="file-search-bar-container">
      <div className="file-search-bar-title">
        <h2>Search Files</h2>
      </div>
      <div className="file-search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search Name"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ paddingLeft: '1.2rem' }}
        />
        <button
          onClick={handleSearchChange}
          className="visit-department-btn text-sm rounded-full px-4 py-3 bg-blue-500 text-white hover:bg-blue-700">
          Search
        </button>
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
          <div
            className="flex items-center shrink-0 ml-2 bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-full">
            <img src="/assets/addFile.svg" alt="add new file" className="w-10 h-8" />
          </div>
        </label>
        {/* <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange}/>
          <div
            className="flex items-center ml-2 bg-blue-500 hover:bg-blue-700 px-4 py-1.5 rounded-full">
            <img src="/assets/addFile.svg" alt="add new file" className="w-10 h-8" />
          </div>
        </label> */}
      </div>
      {showPopup && (
        <div className="file-popup">
          <div className="file-popup-content">
            <div className="popup-header">
              <h3>Upload File</h3>
              <button onClick={handleFileDelete} className="close-popup-btn">
                &times;
              </button>
            </div>
            <div className="popup-body">
              <p>Selected file: {file ? file.name : 'No file selected'}</p>
              <button onClick={handleFileUpload} className="upload-btn">
                Upload
              </button>
              <CancelButton onClick={handleFileDelete} /> {/* Add CancelButton with onClick handler */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFile;
