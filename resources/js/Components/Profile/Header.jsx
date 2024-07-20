// import React, { useState } from 'react';
// import EditProfilePhoto from './EditProfilePhoto';
// import UpdatePhotoButton from './UpdatePhoto';
// import './profile.css';
// import { usePage } from '@inertiajs/react';
// import { useCsrf } from '@/composables';

// // const getCsrfToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// const uploadProfilePhoto = async (file, id, setCurrentProfileImage, setSelectedFile) => {
//   const csrfToken = useCsrf();
//   const formData = new FormData();
//   formData.append('image', file);

//   console.log(file.name)

//   // const csrfToken = getCsrfToken();

//   try {
//     const response = await fetch(`/api/crud/profiles/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ image: file.name }),
//       headers: {
//         "X-CSRF-TOKEN": csrfToken,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const text = await response.text();
//     const data = text ? JSON.parse(text) : {};
//     console.log('Profile photo updated successfully:', data);
//     if (data.profile && data.profile.image) {
//       setCurrentProfileImage(data.profile.image);
//       setSelectedFile(data.profile.image);
//     }
//   } catch (error) {
//     console.error('Error uploading profile photo:', error);
//   }
// };

// function ProfileImage({ src, alt, className, rounded }) {
//   return (
//     <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-24 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className} max-md:w-32 max-md:mt-10`}>
//       <img
//         src={src}
//         alt={alt}
//         className={`object-cover absolute inset-0 bottom-5 top-0 size-[158px] mb-12 ${rounded ? 'rounded-full' : ''} max-md:w-32 max-md:h-32 max-md:bottom-0`}
//       />
//       <div className="relative w-full h-0 flex justify-end mt-16 max-md:mt-10">
//         <div className="absolute w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] bottom-0.5 right-0 left-14 max-md:left-auto max-md:right-0 max-md:bottom-0" />
//       </div>
//     </div>
//   );
// }

// function ProfileHeader({ backgroundImage, profileImage, name, status, onEditBanner, rounded, username }) {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
//   const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);

//   const { props } = usePage();
//   const { id } = props;

//   const openPopup = () => {
//     setIsPopupOpen(true);
//     console.log("Popup opened");
//   };

//   const handleEditBanner = (e) => {
//     e.stopPropagation();
//     onEditBanner();
//   };

//   const handleCloseClick = (e) => {
//     e?.stopPropagation();
//     setIsPopupOpen(false);
//     console.log("Popup closed");
//   };

//   const handleIconClick = (e) => {
//     e.stopPropagation();
//     if (!isPopupOpen) {
//       openPopup();
//     }
//   };

//   const handleSelectFile = (file) => {
//     const fileUrl = URL.createObjectURL(file);
//     setCurrentProfileImage(fileUrl);
//     setSelectedFile(file);
//     setIsPopupOpen(false);
//     setIsUpdatePopupOpen(true);
//     uploadProfilePhoto(file, id, setCurrentProfileImage, setSelectedFile);
//   };

//   const handleCloseUpdatePopup = (e) => {
//     e?.stopPropagation();
//     setIsUpdatePopupOpen(false);
//     console.log("Update Photo Popup closed");
//   };

//   return (
//     <header
//       className="flex overflow-hidden relative z-999 flex-col items-start px-7 pt-32 -mt-14 w-full min-h-[400px] max-md:px-5 max-md:max-w-full"
//       onClick={handleEditBanner}
//     >
//       <img src={backgroundImage} alt="" className="object-cover absolute inset-0 w-full h-4/5 max-md:h-3/5 rounded-lg shadow-custom" />
//       <div onClick={handleIconClick}>
//         <ProfileImage src={currentProfileImage} alt={`${name}'s profile picture`} rounded={rounded} />
//         {isPopupOpen && (
//           <EditProfilePhoto
//             onClose={handleCloseClick}
//             onSelectFile={handleSelectFile}
//           />
//         )}
//         {isUpdatePopupOpen && (
//           <UpdatePhotoButton onClose={handleCloseUpdatePopup} file={selectedFile} />
//         )}
//       </div>
//       <div className="flex flex-col self-start px-5 -mt-16 -ml-10 max-md:-ml-5 max-md:mt-5">
//         <div className="flex items-center ml-48 max-md:ml-0">
//           <h1 className="text-3xl font-extrabold text-neutral-800 relative max-md:text-xl">{name}</h1>
//           <div className="text-xl ml-4 font-semibold text-neutral-800 text-opacity-50 max-md:text-sm">{username}</div>
//         </div>
//         <div className="mt-2 text-xs font-semibold text-neutral-800 text-opacity-50 ml-48 max-md:text-sm max-md:ml-0">{status}</div>
//       </div>
//     </header>
//   );
// }

// export default ProfileHeader;

import React, { useState } from 'react';
import EditProfilePhoto from './EditProfilePhoto';
import UpdatePhotoButton from './UpdatePhoto';
import './profile.css';
import { useCsrf } from '@/composables';

function ProfileImage({ src, alt, className, rounded }) {
  return (
    <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-24 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className} max-md:w-32 max-md:mt-10`}>
      <img
        src={`/storage/${src}`}
        alt={alt}
        className={`object-cover absolute inset-0 bottom-5 top-0 size-[158px] mb-12 ${rounded ? 'rounded-full' : ''} max-md:w-32 max-md:h-32 max-md:bottom-0`}
      />
      <div className="relative w-full h-0 flex justify-end mt-16 max-md:mt-10">
        <div className="absolute w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] bottom-0.5 right-0 left-14 max-md:left-auto max-md:right-0 max-md:bottom-0" />
      </div>
    </div>
  );
}

function ProfileHeader({ backgroundImage, profileImage, name, status, onEditBanner, rounded, username, userId }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const csrfToken = useCsrf();
  const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("Popup opened");
  };

  const handleEditBanner = (e) => {
    e.stopPropagation();
    onEditBanner();
  };

  const handleCloseClick = (e) => {
    e?.stopPropagation();
    setIsPopupOpen(false);
    console.log("Popup closed");
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (!isPopupOpen) {
      openPopup();
    }
  };

  const handleSelectFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentProfileImage(fileUrl);
      setSelectedFile(file);
      setIsPopupOpen(false);
      setIsUpdatePopupOpen(true);
      uploadProfilePhoto(file, userId, setCurrentProfileImage, setSelectedFile, csrfToken, authToken);
    }
  };

  const handleCloseUpdatePopup = (e) => {
    e?.stopPropagation();
    setIsUpdatePopupOpen(false);
    console.log("Update Photo Popup closed");
  };

  const uploadProfilePhoto = async (file, id, setCurrentProfileImage, setSelectedFile, csrfToken, authToken) => {
    const url = `/api/profile/profiles/${id}`;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_id', id);
    formData.append('_method', 'PUT');

    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Authorization': `Bearer ${authToken}`,
      },
      body: formData,
    };

    try {
      console.log('Uploading profile photo with payload:', {
        image: file,
        user_id: id,
      });

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error response from server:', data);
        throw new Error('Network response was not ok');
      }

      console.log('Profile photo updated successfully:', data);
      if (data.profile && data.profile.image) {
        const fullPath = data.profile.image;
        setCurrentProfileImage(fullPath);
        setSelectedFile(fullPath);
      }
    } catch (error) {
      // console.error('Error uploading profile photo:', error);
    }
  };

  return (
    <header
      className="flex overflow-hidden relative z-999 flex-col items-start px-7 pt-32 -mt-14 w-full min-h-[400px] max-md:px-5 max-md:max-w-full"
      onClick={handleEditBanner}
    >
      <img src={backgroundImage} alt="" className="object-cover absolute inset-0 w-full h-4/5 max-md:h-3/5 rounded-lg shadow-custom" />
      <div onClick={handleIconClick}>
        <ProfileImage src={profileImage} alt={`${name}'s profile picture`} rounded={rounded} />
        {isPopupOpen && (
          <EditProfilePhoto
            onClose={handleCloseClick}
            onSelectFile={handleSelectFile}
            userId={userId}
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
