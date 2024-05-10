import React from 'react';
import RequestSentMessage from './RequestAdmin';

const PhotoButton = ({ type, text, onClick }) => {
  const className = type === "primary"
    ? "justify-center px-7 py-3 bg-blue-500 text-white rounded-2xl"
    : "justify-center px-7 py-3 text-base rounded-2xl border border-solid border-stone-300 text-neutral-400";

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

function UpdatePhotoButton({ onClose }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("Sub-popup opened for further actions");
  };

  const handleIconClick = (e) => {
    e.stopPropagation(e); // Stop event propagation to prevent unintended interactions
    openPopup(e); // Open the RequestSentMessage popup or perform any action
    // Assuming action takes little to no time, we schedule the close
    setTimeout(() => { // Use setTimeout to simulate delay if needed
      console.log("Action completed, closing all popups");
      setIsPopupOpen(false); // Close the RequestSentMessage popup
      onClose(e); // Close the main popup
    }, 20000); // Set timeout for 3000 ms or adjust based on actual needs

  };

  const handleCloseClick = (e) => {
    console.log("Closing popup via internal close"); // Debug log
    setIsPopupOpen(false);
    onClose(e);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="p-2 rounded-3xl w-4xl" onClick={(e) => e.stopPropagation()}>
        <section className="flex flex-col px-2.5 py-1 font-bold text-center bg-white rounded-xl shadow-lg w-[380px]">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff" 
               alt="Close icon" 
               className="self-end w-6 my-2 aspect-square cursor-pointer" 
               onClick={handleCloseClick} 
          />
          <div className="flex flex-col pr-2.5 pl-2 w-full">
            <h2 className="text-xl text-neutral-800">Update Photo to Staff Directory?</h2>
            <div className="flex gap-4 self-center my-5">
              <PhotoButton type="primary" text="Yes" onClick={handleIconClick} />
              <PhotoButton type="secondary" text="No" onClick={handleCloseClick} />
            </div>
          </div>
        </section>
      </div>
      {isPopupOpen && (
          <RequestSentMessage onClose={handleCloseClick} />
        )}
    </div>
  );
}

export default UpdatePhotoButton;
