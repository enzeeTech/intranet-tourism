import React from 'react';
import EditProfilePhoto from './EditProfilePhoto';

function ProfileImage({ src, alt, className }) {
    return (
      <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-24 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className}`}>
        <img src={src} alt={alt} className="object-cover absolute inset-0 size-full" />
        <div className="relative shrink-0 mt-16 w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] max-md:mt-10 left-10" />
      </div>
    );
}

function ProfileHeader({ backgroundImage, profileImage, name, status, onEditBanner }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("bukak");
  };
  
  // const handleCloseClick = () => {
  //   setIsPopupOpen(false);
  //   console.log("tutup");
  // };

    const handleEditBanner = (e) => {
      e.stopPropagation(); // Prevents the click event from propagating to parent elements
      onEditBanner(); // Calls the onEditBanner function when the background image is clicked
    };

    const handleCloseClick = (e) => {
      e.stopPropagation(); // Prevent any parent handlers from being executed
      setIsPopupOpen(false); // Close the popup
      console.log("Tutup bro");
    };
    
    // Ensure that clicking on the ProfileImage or the header does not unintentionally toggle the popup:
    const handleIconClick = (e) => {
      e.stopPropagation(); // Prevent the click from affecting parent elements
      if (!isPopupOpen) {
        openPopup(); // Only open if it is not already open
      }
    };
    return (
      <header
        className="flex overflow-hidden relative z-10 flex-col items-start px-7 pt-20 -mt-14 w-half min-h-[270px] max-md:px-5 max-md:max-w-half"
        onClick={handleEditBanner} // Added onClick handler to trigger onEditBanner
      >
        <img src={backgroundImage} alt="" className="object-cover absolute inset-0 size-half" />
        < div onClick={handleIconClick}>
        <ProfileImage src={profileImage} alt={`${name}'s profile picture`} />
        {isPopupOpen && (
          // <EditProfilePhoto onClose={handleCloseClick} />
          // <EditProfilePhoto onClose={handleCloseClick} onOpenUpdatePopup={() => setIsPopupOpen(false)} />
          <EditProfilePhoto
  onClose={handleCloseClick}
  onOpenUpdatePopup={() => {
    setIsPopupOpen(false);
    console.log("Main popup closed, ready to open update popup.");
    return new Promise(resolve => setTimeout(resolve, 0)); // Ensures that state update completes
  }}
/>
        )}
        </div>
        <div className="flex flex-col self-center px-5 -mt-10 -ml-96">
          <h1 className="self-end text-3xl font-extrabold text-neutral-800 ml-48">{name}</h1>
          <div className="mt-2 text-xs font-semibold text-neutral-800 text-opacity-50 ml-48">{status}</div>
        </div>

      </header>
    );
    

}

export default ProfileHeader;