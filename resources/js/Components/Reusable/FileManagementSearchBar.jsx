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
      className="self-end px-6 py-2 font-bold text-gray-400 bg-white hover:bg-gray-400 hover:text-white rounded-full border border-gray-400"
      onClick={onClick}
    >
      Cancel
    </button>
  );

  return (
    <div className="staff-search-bar-container max-w-[1100px] p-4 bg-white rounded-2xl shadow-custom mb-5 sm:left">
      <div className="file-search-bar-title -mt-1">
        <h2>Search Files</h2>
      </div>
      <div className="file-search-bar">
        <input
          type="text"
          // className="search-input font-bold py-4 px-4 bg-gray-100 border-gray-100"
          className="rounded-full flex-grow w-full font-bold py-3 px-6 bg-gray-100 border-gray-100 text-neutral-800 sm:w-auto"
          placeholder="Search File Name"
          value={searchTerm}
          onChange={handleSearchChange} 
          style={{ paddingLeft: '1.5rem' }}
          // style={{ paddingLeft: '1.2rem' }}
        />
        {/* <button
          onClick={handleSearchChange}
          className="visit-department-btn text-md font-bold rounded-full px-4 py-3 mx-3 bg-blue-500 text-white hover:bg-blue-700">
          Search
        </button> */}
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
          <div
            className="flex items-center bg-blue-500 hover:bg-blue-700 px-4 py-2 max-md:px-3 h-full rounded-full ml-4 mr-2">
            <img src="/assets/plus.svg" alt="add new file" className="w-5 h-5" />
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
        <div className="file-popup px-4">
          <div className="file-popup-content rounded-3xl w-[400px]">
            <div className="popup-header">
            <h2 className="mb-4 text-2xl font-bold flex justify-start">Upload file</h2>
            </div>
            <div className="popup-body">
              <div className="flex justify-start">
                <p className="font-bold mb-2 items-start">Selected file:</p>
              </div>
              <div className="flex justify-start w-full px-4 py-2 border-2 border-gray-400 rounded-md overflow-hidden">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {file ? file.name : 'No file selected'}
                </p>
              </div>
              <div className="flex flex-row justify-end mt-4 space-x-2">
                <CancelButton onClick={handleFileDelete} /> {/* Add CancelButton with onClick handler */}
                <button onClick={handleFileUpload} className="upload-btn bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFile;
