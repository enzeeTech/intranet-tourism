import React, { useState } from 'react';
import axios from 'axios';
import searchIcon from '../../../../public/assets/searchStaffButton.png';
import './css/FileManagementSearchBar.css';
import './css/General.css';

const IconButton = ({ src, alt, className, onClick }) => {
  return <img loading="lazy" src={src} alt={alt} className={className} onClick={onClick} />;
};

const truncateFileName = (fileName, maxLength) => {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  const truncated = fileName.substring(0, maxLength - 3) + '...';
  return truncated;
};

const SearchFile = ({ onSearch, requiredData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = () => {
    console.log(searchTerm);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setShowPopup(true);
    console.log('File selected:', selectedFile);
    event.target.value = null;  // Clear the input value to allow re-selecting the same file
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

    console.log('Uploading file:', file);

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

    console.log('FormData:', formData);

    const options = {
      method: 'POST',
      url: '/api/crud/resources',
      headers: {
        'Accept': 'application/json'
      },
      data: formData
    };

    try {
      const { data } = await axios.request(options);
      console.log('File uploaded successfully:', data);
      setShowPopup(false);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = () => {
    setFile(null);
    setShowPopup(false);
    console.log('File deleted');
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
        <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
          <input type="file" id="file-upload" style={{ display: 'none' }} onChange={handleFileChange} />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/09e8f0029fa709f52ac7d218876a28da6904c7ef7108cbb12df1fb413678c59c?apiKey=285d536833cc4168a8fbec258311d77b&"
            alt=""
            className="shrink-0 my-auto aspect-[1.45] w-[49px] ml-2"
          />
        </label>
      </div>
      {showPopup && (
        <div className="file-popup-container">
          <div className="file-popup">
            <section className="flex flex-col py-2.5 text-center bg-white rounded-xl shadow-custom max-w-[500px]">
              <header className="flex gap-5 self-center px-5 max-w-full text-2xl font-bold text-neutral-800 w-auto">
                <h1 className="flex-auto">Attached file</h1>
              </header>
              <main className="flex flex-col px-2.5 mt-2 w-full">
                <div className="flex gap-5 font-medium text-xs text-neutral-800">
                  <div className="flex flex-auto gap-2 items-center">
                    <IconButton src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a36c1619d2a1399b98302d863cb36625dfcebb4eafe9253b73746ca1169112?apiKey=285d536833cc4168a8fbec258311d77b&" alt="" className="shrink-0 self-stretch aspect-square w-[52px]" />
                    <p className="flex-auto self-stretch my-auto text-sm">{file ? truncateFileName(file.name, 30) : ''}</p>
                    <p className="self-stretch my-auto text-xs">{file ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : ''}</p>
                  </div>
                </div>
                <div className="flex gap-1.5 self-end mt-1 max-w-full font-bold whitespace-nowrap w-[164px]">
                  <button className="justify-center text-sm text-white px-6 py-3 bg-blue-500 rounded-3xl" onClick={handleFileUpload}>
                    Save
                  </button>
                  <button className="justify-center px-4 py-3 text-base rounded-2xl border border-solid border-stone-300 text-neutral-400" onClick={handleFileDelete}>
                    Cancel
                  </button>
                </div>
              </main>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFile;
