// import * as React from "react";

// function Avatar({ src, alt, isSelected, onClick }) {
//   return (
//     <img
//       loading="lazy"
//       src={src}
//       alt={alt}
//       className={`shrink-0 aspect-square w-[94px] cursor-pointer hover:scale-125 transition-transform duration-300 ${isSelected ? 'border-4 border-blue-500' : ''}`}
//       onClick={onClick}
//     />
//   );
// }

// function PhotoAndAvatarPopup({ onClose }) {
//   // const [isPopupOpen, setIsPopupOpen] = React.useState(false);
//   const [selectedAvatar, setSelectedAvatar] = React.useState(null);

//   const avatars = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4e1c4a581808ca681f0a37e05a0e54c14f0fe4b55b80cc4765c6aaa1b915eb20?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 1" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c06e20af9a472e9e623b3a6f9cf09d8682201ad07858e14413344ea8e0d85c7f?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 2" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5449e61c9ca6cce4b3481c0fe2dbeb13281551127a3467dfbc2b0c44901a1d1d?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 3" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/492d3b6a5824fa6c6fd8fa279f8e14df49804e795a86d90c1e03a3db2302dc0c?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 4" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/382e27cb6993749bf991600ee4fd68475100ee8a6b52fb389ba6aa05259c0389?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 5" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7e1d6d79285a3e564d5711f6bf8443d0df87731e632dca6001e6f7e96ff403b2?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 6" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f2cd2ed741d255ecc0530f610b699a85ba1f7ca8efb965c6ac3930925da93d93?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 7" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2dcdeb763b5fd05e3eea5a82a30b5c3c80cc88b918dddeb7c1b1d30314609ae8?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 8" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd91eccd8ec81e7ca85bd2f9e11c50db4f82828e11493ab13f9485f0e242a76d?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 9" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cb9f603e0c323e1dff0e9f2a0d2fa701d89c21aa1149503ac930720c4879210d?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 10" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d04048009fbc86a35f860519f15535152e908086780aeba3af978648177a7dd?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 11" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6dd94ac5771308be091ee32c4377afbbc3ebb66a7c6c4a7bd30e6fa55244b620?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 12" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/db86bc68eba2264c8b9b299c9e4ae08e448f3f8ec03fbbc136075a0d7c5245fb?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 13" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/745ac6b02e288742e0a3a8aa786a1fa55b64d121c92117a2e8217de4f6e7d027?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 14" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e1a889361219e037789252f15ae7a87e5fa1ea9f6afa24209cf4b2d709692952?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Avatar 15" },
//   ];

//   const handleAvatarClick = (avatar) => {
//     setSelectedAvatar(avatar.src); // Set the selected avatar using its source URL as a unique identifier
//     console.log(`Avatar clicked: ${avatar.alt}`);
//   };


//   // const handleCloseUpdatePopup = (e) => {
//   //   e.stopPropagation();
//   //   setShowUpdatePopup(false);
//   //   onTutup(e); // Optionally close the entire modal if needed
//   // };

//   // const handleCloseClick = (e) => {
//   //   console.log("Closing popup via internal close"); // Debug log
//   //   setIsPopupOpen(false);
//   //   onTutup(e);
//   // };
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg--800 bg-opacity-50 z-50 rounded-3xl shadow-custom">
//       <div className="p-2 rounded-3xl w-2xl" onClick={(e) => e.stopPropagation()}>
//         <section className="flex flex-col py-2.5 bg-white rounded-2xl w-[700px]">
//           <div className="flex flex-col pr-2.5 pl-5 w-full">
//             <header className="flex gap-5 items-start text-2xl font-bold text-neutral-800">
//               <h1 className="flex-auto mt-5">Pick an Avatar</h1>
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&"
//                 alt="Close icon"
//                 className="shrink-0 w-6 aspect-square cursor-pointer"
//                 onClick={onClose}
//               />
//             </header>
//             <div className="grid grid-cols-6 gap-3 mt-9">
//               {avatars.map((avatar) => (
//                 <div className="w-[90px] h-[90px]" key={avatar.src}>
//                   <Avatar
//                     src={avatar.src}
//                     alt={avatar.alt}
//                     isSelected={selectedAvatar === avatar.src}
//                     onClick={() => handleAvatarClick(avatar)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//           <footer className="flex gap-2.5 self-end mt-3.5 mr-6 text-sm font-bold text-center">
//             <button onClick={onClose} className="justify-center px-4 py-2.5 whitespace-nowrap bg-white rounded-2xl border border-solid border-stone-300 text-neutral-400">
//               Cancel
//             </button>
//             <button onClick={onClose} className="flex flex-col justify-center text-white">
//               <span className="justify-center px-6 py-2.5 bg-blue-500 rounded-2xl">Save</span>
//             </button>
//           </footer>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default PhotoAndAvatarPopup;


import * as React from "react";
import { useCsrf } from '@/composables';

function Avatar({ src, alt, isSelected, onClick }) {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      className={`shrink-0 aspect-square w-[94px] cursor-pointer hover:scale-125 transition-transform duration-300 ${isSelected ? 'border-4 border-blue-500' : ''}`}
      onClick={onClick}
    />
  );
}

function PhotoAndAvatarPopup({ onClose, userId, csrfToken, authToken, profileImage, setProfileImage }) {
  console.log("User ID: ", userId);  // Debugging line to check if userId is passed correctly
  console.log("CSRF Token: ", csrfToken);  // Debugging line to check CSRF token
  console.log("Auth Token: ", authToken);  // Debugging line to check Auth token

  const [selectedAvatar, setSelectedAvatar] = React.useState(null);

  const avatars = [
    { src: "assets/Avatar 1.png", alt: "Avatar 1" },
    { src: "assets/Avatar 2.png", alt: "Avatar 2" },
    { src: "assets/Avatar 3.png", alt: "Avatar 3" },
    { src: "assets/Avatar 4.png", alt: "Avatar 4" },
    { src: "assets/Avatar 5.png", alt: "Avatar 5" },
    { src: "assets/Avatar 6.png", alt: "Avatar 6" },
    { src: "assets/Avatar 7.png", alt: "Avatar 7" },
    { src: "assets/Avatar 8.png", alt: "Avatar 8" },
    { src: "assets/Avatar 9.png", alt: "Avatar 9" },
    { src: "assets/Avatar 10.png", alt: "Avatar 10" },
    { src: "assets/Avatar 11.png", alt: "Avatar 11" },
    { src: "assets/Avatar 12.png", alt: "Avatar 12" },
    { src: "assets/Avatar 13.png", alt: "Avatar 13" },
    { src: "assets/Avatar 14.png", alt: "Avatar 14" },
    { src: "assets/Avatar 15.png", alt: "Avatar 15" },
  ];

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar.src);
    console.log(`Avatar clicked: ${avatar.alt}`);
  };

  const handleSaveClick = async () => {
    if (!selectedAvatar) {
      alert("Please select an avatar to save.");
      return;
    }

    try {
      // Fetch the image as a blob
      const response = await fetch(selectedAvatar);
      const blob = await response.blob();

      // Create a file from the blob
      const file = new File([blob], `${selectedAvatar.split('/').pop()}`, { type: blob.type });

      const formData = new FormData();
      formData.append('image', file);
      formData.append('user_id', userId);
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

      const saveResponse = await fetch(`/api/profile/profiles/${userId}`, options);
      const data = await saveResponse.json();

      if (!saveResponse.ok) {
        console.error('Error response from server:', data);
        throw new Error('Network response was not ok');
      }

      console.log('Avatar updated successfully:', data);
      setProfileImage(selectedAvatar); // Update the profile image in the parent component
      onClose(); // Close the popup
    } catch (error) {
      // console.error('Error updating avatar:', error);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 rounded-3xl shadow-custom">
      <div className="p-2 rounded-3xl w-2xl" onClick={(e) => e.stopPropagation()}>
        <section className="flex flex-col py-2.5 bg-white rounded-3xl w-[700px]">
          <div className="flex flex-col pr-2.5 pl-5 w-full">
            <header className="flex gap-5 items-start text-2xl font-bold text-neutral-800">
              <h1 className="flex-auto mt-5">Pick an Avatar</h1>
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=285d536833cc4168a8fbec258311d77b&"
                alt="Close icon"
                className="shrink-0 w-6 aspect-square cursor-pointer"
                onClick={onClose}
              /> */}
            </header>
            <div className="grid grid-cols-6 gap-3 mt-9 px-2">
              {avatars.map((avatar) => (
                <div className="w-[90px] h-[90px]" key={avatar.src}>
                  <Avatar
                    src={avatar.src}
                    alt={avatar.alt}
                    isSelected={selectedAvatar === avatar.src}
                    onClick={() => handleAvatarClick(avatar)}
                  />
                </div>
              ))}
            </div>
          </div>
          <footer className="flex gap-2.5 self-end m-4 mr-6 text-sm font-bold text-center">
            <button onClick={onClose} className="bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full">
              Cancel
            </button>
            <button onClick={handleSaveClick} className="flex flex-col justify-center text-white">
              <span className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</span>
            </button>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default PhotoAndAvatarPopup;


