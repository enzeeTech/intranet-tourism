import React, { useState } from 'react';
import EditProfilePhoto from './EditProfilePhoto';
import UpdatePhotoButton from './UpdatePhoto';
import './profile.css';

function ProfileImage({ src, alt, className, rounded }) {
  return (
    <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-24 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className} max-md:w-32 max-md:mt-10`}>
      <img
        src={src}
        alt={alt}
        className={`object-cover absolute inset-0 bottom-5 top-0 size-[158px] mb-12 ${rounded ? 'rounded-full' : ''} max-md:w-32 max-md:h-32 max-md:bottom-0`}
      />
      <div className="relative w-full h-0 flex justify-end mt-16 max-md:mt-10">
        <div className="absolute w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] bottom-0.5 right-0 left-14 max-md:left-auto max-md:right-0 max-md:bottom-0" />
      </div>
    </div>
  );
}

function ProfileHeader({ backgroundImage, profileImage, name, status, onEditBanner, rounded, username }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("Popup opened");
  };

  const handleEditBanner = (e) => {
    e.stopPropagation();
    onEditBanner();
  };

  const handleCloseClick = (e) => {
    e?.stopPropagation(); // Optional chaining to prevent error if no event is passed
    setIsPopupOpen(false);
    console.log("Popup closed");
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (!isPopupOpen) {
      openPopup();
    }
  };

  const handleSelectFile = (file) => {
    const fileUrl = URL.createObjectURL(file);
    setCurrentProfileImage(fileUrl);
    setSelectedFile(file); // Save the file for uploading
    setIsPopupOpen(false); // Close the edit profile popup
    setIsUpdatePopupOpen(true); // Open the update photo popup
  };

  const handleCloseUpdatePopup = (e) => {
    e?.stopPropagation(); // Optional chaining to prevent error if no event is passed
    setIsUpdatePopupOpen(false);
    console.log("Update Photo Popup closed");
  };

  return (
    <header
      className="flex overflow-hidden relative z-999 flex-col items-start px-7 pt-32 -mt-14 w-full min-h-[400px] max-md:px-5 max-md:max-w-full"
      onClick={handleEditBanner}
    >
      <img src={backgroundImage} alt="" className="object-cover absolute inset-0 w-full h-4/5 max-md:h-3/5 rounded-lg shadow-custom" />
      <div onClick={handleIconClick}>
        <ProfileImage src={currentProfileImage} alt={`${name}'s profile picture`} rounded={rounded} />
        {isPopupOpen && (
          <EditProfilePhoto
            onClose={handleCloseClick}
            onSelectFile={handleSelectFile}
          />
        )}
        {isUpdatePopupOpen && (
          <UpdatePhotoButton onClose={handleCloseUpdatePopup} file={selectedFile} />
        )}
      </div>
      <div className="flex flex-col self-start px-5 -mt-16 -ml-10 max-md:-ml-5 max-md:mt-5">
        <div className="flex items-center ml-48 max-md:ml-0">
          <h1 className="text-3xl font-extrabold text-neutral-800 relative max-md:text-xl">{name}</h1>
          <div className="text-xl ml-4 font-semibold text-neutral-800 text-opacity-50 max-md:text-sm">{username}</div>
        </div>
        <div className="mt-2 text-xs font-semibold text-neutral-800 text-opacity-50 ml-48 max-md:text-sm max-md:ml-0">{status}</div>
      </div>
    </header>
  );
}

export default ProfileHeader;







