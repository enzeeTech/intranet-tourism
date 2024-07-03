
import React, { useState, useEffect } from 'react';
import PhotoAndAvatarPopup from './PhotoAndAvatarPopup';
import UpdatePhotoButton from './UpdatePhoto';

function IconButton({ icon, alt, onClick }) {
  return (
    <button type="button" className="shrink-0 w-6 aspect-square" onClick={onClick}>
      <img src={icon} alt={alt} />
    </button>
  );
}

function ListItem({ icon, alt, text, onClick }) {
  return (
    <div className="flex gap-5 my-2 cursor-pointer" onClick={onClick}>
      <img src={icon} alt={alt} className="shrink-0 aspect-square w-[27px]" />
      <div className="flex-auto my-auto">{text}</div>
    </div>
  );
}


function EditProfilePhoto({ onClose }) {
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickImg = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
        setShowUpdatePopup(true); // Set state to open the update popup
        onClose(); // Close the modal after the file is selected
      } else {
        onClose(); // Optionally close the modal even if no file is selected
      }
    };
    fileInput.click();
  };


  const handleClickAvt = () => {
    setShowPopup(true);
    onClose(); // Close the modal immediately
  };

  useEffect(() => {
    console.log("showUpdatePopup changed to:", showUpdatePopup);
  }, [showUpdatePopup]);


  const handleAvatarClose = (e) => {
    e.stopPropagation();
    setShowPopup(false);
  };

  const handleCloseUpdatePopup = (e) => {
    e.stopPropagation();
    setShowUpdatePopup(false);
    onClose(e); // Optionally close the entire modal if needed
  };

  const listItems = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1ae79536efa88fed305a882166d77297fa8a69f24be922b6ce0669e04cedfe71?apiKey=285d536833cc4168a8fbec258311d77b&",
      alt: "Gallery icon",
      text: "Choose photo from gallery",
      onClick: handleClickImg,
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ebe0983fa0fec66a2099871f0472a44d63811c7a4aee605ddf3f7ae9a2d01e6b?apiKey=285d536833cc4168a8fbec258311d77b&",
      alt: "Avatar icon",
      text: "Pick new Avatar",
      onClick: handleClickAvt,
    },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
      <div className="p-2 rounded-3xl w-4xl" onClick={(e) => e.stopPropagation()}>
        <section className="flex flex-col py-2.5 bg-white rounded-2xl shadow-custom w-[330px]">
          <div className="flex flex-col pr-2.5 pl-5 w-full">
            <header className="flex gap-5 justify-between items-start text-xl font-bold text-neutral-800">
              <h1 className="flex-auto mt-3">Edit Profile Photo</h1>
              <IconButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&" alt="Close icon" onClick={onClose} />
            </header>
            <div className="flex flex-col mt-3">
              {listItems.map((item, index) => (
                <ListItem key={index} icon={item.icon} alt={item.alt} text={item.text} onClick={item.onClick} />
              ))}
            </div>
          </div>
        </section>
      </div>
      {showPopup && <PhotoAndAvatarPopup onClose={handleCloseUpdatePopup} />}
      {showUpdatePopup && <UpdatePhotoButton onClose={handleCloseUpdatePopup} />}
    </div>
  );
}


export default EditProfilePhoto;
