// import React, { useState, useRef, useEffect } from "react";
// import { CreateStory } from "./CreateImageStory";
// import CreateVideoStory from "./CreateVideoStory";

// // Popup component
// const Popup = ({ isOpen, onClose }) => {
//   const [section, setSection] = useState('main');

//   const handlePictureClick = () => {
//     setSection('picture');
//   };

//   const handleVideoClick = () => {
//     setSection('video');
//   };

//   const handleBackClick = () => {
//     setSection('main');
//   };

//   const handleClose = () => {
//     setSection('main');
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       {section === 'main' && (
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
//           <div className="flex justify-between items-center mb-4">
//             <h1 className="text-2xl font-bold w-full text-center">Create a Story</h1>
//             <button onClick={handleClose} className="text-gray-600 hover:text-black">
//               <img src="/assets/icon-close.png" alt="Close" />
//             </button>
//           </div>
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded m-2"
//             onClick={handlePictureClick}
//           >
//             Picture
//           </button>
//           <button
//             className="bg-blue-500 text-white py-2 px-4 rounded m-2"
//             onClick={handleVideoClick}
//           >
//             Video
//           </button>
//           <button
//             className="bg-red-500 text-white py-2 px-4 rounded m-2"
//             onClick={handleClose}
//           >
//             Close
//           </button>
//         </div>
//       )}
//       {section === 'picture' && (
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center w-5/6 h-5/6">
//           <CreateStory goBack={handleBackClick} onClose={handleClose} />
//         </div>
//       )}
//       {section === 'video' && (
//         <div className="bg-white p-6 rounded-lg shadow-lg text-center w-5/6 h-5/6">
//           <CreateVideoStory goBack={handleBackClick} onClose={handleClose} />
//         </div>
//       )}
//     </div>
//   );
// };

// // ImageVideoPopup component
// const ImageVideoPopup = ({ isOpen, onClose, media }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const slideInterval = useRef(null);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       const slideDuration = media[currentSlide].type === 'image' ? 10000 : 30000;

//       slideInterval.current = setInterval(() => {
//         setCurrentSlide((prevSlide) => (prevSlide + 1) % media.length);
//       }, slideDuration);

//       return () => clearInterval(slideInterval.current);
//     }
//   }, [isOpen, media, currentSlide]);

//   const handlePrevSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide - 1 + media.length) % media.length);
//   };

//   const handleNextSlide = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % media.length);
//   };

//   const handleVideoEnded = () => {
//     setCurrentSlide((prevSlide) => (prevSlide + 1) % media.length);
//   };

//   useEffect(() => {
//     if (isOpen && media[currentSlide].type === 'video') {
//       const videoElement = videoRef.current;
//       videoElement.currentTime = 0;
//       videoElement.play();

//       videoElement.onended = handleVideoEnded;

//       const videoTimeout = setTimeout(() => {
//         handleVideoEnded();
//       }, 30000);

//       return () => {
//         clearTimeout(videoTimeout);
//         videoElement.onended = null;
//       };
//     }
//   }, [isOpen, currentSlide, media]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-5/6 h-5/6 relative">
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
//           <img src="/assets/icon-close.png" alt="Close" />
//         </button>
//         <div className="flex justify-between items-center h-full">
//           <button onClick={handlePrevSlide} className="text-gray-600 hover:text-black">
//             &lt;
//           </button>
//           <div className="w-4/5 flex justify-center items-center">
//             {media[currentSlide].type === 'image' ? (
//               <img src={media[currentSlide].src} alt="Slide" className="max-h-full max-w-full object-contain" />
//             ) : (
//               <video
//                 ref={videoRef}
//                 id="video-element"
//                 src={media[currentSlide].src}
//                 autoPlay
//                 className="max-h-full max-w-full object-contain"
//               />
//             )}
//           </div>
//           <button onClick={handleNextSlide} className="text-gray-600 hover:text-black">
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popup;




// import React from 'react';
// import Modal from 'react-modal';

// const Popup = ({ isOpen, onClose, children }) => {
//     return (
//         <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={{
//             content: {
//                 top: '50%',
//                 left: '50%',
//                 right: 'auto',
//                 bottom: 'auto',
//                 marginRight: '-50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '80%',
//                 maxWidth: '500px',
//                 padding: '20px',
//                 background: '#fff',
//                 borderRadius: '10px',
//                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//             },
//             overlay: {
//                 backgroundColor: 'rgba(0, 0, 0, 0.75)',
//             },
//         }}>
//             <button onClick={onClose} style={{
//                 position: 'absolute',
//                 top: '10px',
//                 right: '10px',
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '16px',
//                 cursor: 'pointer',
//             }}>X</button>
//             {children}
//         </Modal>
//     );
// };

// export default Popup;





import React from 'react';
import Modal from 'react-modal';

const Popup = ({ isOpen, onClose, children }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false} style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '800px',
                padding: '0',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
            },
        }}>
            <button onClick={onClose} className="modal-close-button mt-2 mr-2">
                            <img src="/assets/cancel.svg" alt="Close icon" className="w-6 h-6" />
                        </button>
            {children}
        </Modal>
    );
};

export default Popup;

