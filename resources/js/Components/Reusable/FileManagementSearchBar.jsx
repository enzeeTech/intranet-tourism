import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import searchIcon from '../../../../public/assets/searchStaffButton.png'; 
import './css/FileManagementSearchBar.css';
import './css/General.css';

const SearchFile = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null); // State to hold the selected file

  const handleSearch = () => {
    console.log(searchTerm);
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file from the array
    setFile(selectedFile);
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make a POST request to your Laravel backend endpoint for file upload
      const response = await axios.post('YOUR_LARAVEL_BACKEND_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);
      // Optionally, you can trigger any action after successful upload, like refreshing the file list, etc.
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error if needed
    }
  };

  // Function to handle file deletion
  const handleFileDelete = () => {
    setFile(null);
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
            {file && (
              <div className="file-preview">
                {/* Show file name */}
                <span>{file.name}</span>
                {/* Button to delete file */}
                <button onClick={handleFileDelete}>x</button>
              </div>
            )}
            {!file && (
              // Image button to trigger file selection
              <label htmlFor="file-upload">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09e8f0029fa709f52ac7d218876a28da6904c7ef7108cbb12df1fb413678c59c?apiKey=285d536833cc4168a8fbec258311d77b&"
                  alt=""
                  className="shrink-0 my-auto aspect-[1.45] w-[49px]"
                />
              </label>
            )}
            {/* Hidden file input element */}
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {/* Button to trigger file upload */}
            <button onClick={handleFileUpload}>
              Upload File
            </button>
        </div>
    </div>
  );
};

export default SearchFile;
