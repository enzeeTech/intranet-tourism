import React, { useState } from 'react';
import axios from 'axios';
//import searchIcon from '../../../../public/assets/searchStaffButton.png';
//import './css/FileManagementSearchBar.css';
//import './css/General.css';

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
    formData.append('user_id', '1');
    formData.append('type', 'post');
    formData.append('visibility', 'public');
    formData.append('content', inputValue);

    attachments.forEach((file, index) => {
      formData.append(`attachments[${index}]`, file);
    });

    fetch("/api/crud/posts", {
      method: "POST",
      body: formData,
      headers: { Accept: 'application/json' }
    })
    .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInputValue("");
        setAttachments([]);
        setFileNames([]);
        // window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        // window.location.reload();
      });
  };

  const handleFileUpload = (file) => {
    setAttachments((prevAttachments) => [...prevAttachments, file]);
    setFileNames((prevFileNames) => [...prevFileNames, file.name]);
  };

  const createFileInputHandler = (accept) => () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = accept;
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      handleFileUpload(file);
    };
    fileInput.click();
  };

  const handleClickImg = createFileInputHandler('image/*');
  const handleClickVid = createFileInputHandler('video/*');
  const handleClickDoc = createFileInputHandler('application/pdf, .doc, .docx, .txt');

  const handleClickPoll = () => {
    setShowPollPopup(true);
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
