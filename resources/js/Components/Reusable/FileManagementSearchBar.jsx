import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import searchIcon from '../../../../public/assets/searchStaffButton.png'; 
import './css/FileManagementSearchBar.css';
import './css/General.css';

const SearchFile = ({ onSearch, requiredData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);

  const handleSearch = () => {
    console.log(searchTerm);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = async () => {
    if (!file) {
      console.log('No file selected.');
      return;
    }

    if (!requiredData) {
      console.log('Required data is not available.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', requiredData.user_id);
    formData.append('attachable_type', requiredData.attachable_type);
    formData.append('attachable_id', requiredData.attachable_id);
    formData.append('for', requiredData.for);
    formData.append('path', requiredData.path);
    formData.append('extension', requiredData.extension);
    formData.append('mime_type', requiredData.mime_type);
    formData.append('filesize', requiredData.filesize);
    formData.append('metadata', requiredData.metadata);

    const options = {
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/crud/resources',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: formData
    };

    try {
      const { data } = await axios.request(options);
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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
            <span>{file.name}</span>
            <button onClick={handleFileDelete}>x</button>
          </div>
        )}
        {!file && (
          <label htmlFor="file-upload">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/09e8f0029fa709f52ac7d218876a28da6904c7ef7108cbb12df1fb413678c59c?apiKey=285d536833cc4168a8fbec258311d77b&"
              alt=""
              className="shrink-0 my-auto aspect-[1.45] w-[49px]"
            />
          </label>
        )}
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
    </div>
  );
};

export default SearchFile;
