import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import threeDotsIcon from '../../../../public/assets/threedots.svg';
import deleteIcon from '../../../../public/assets/deleteicon.svg';
import downloadIcon from '../../../../public/assets/downloadicon.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PopupContent = ({ file }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    console.log('Delete clicked');
    // Add your delete logic here
    // For example, you might call an API to delete the file
    fetch(`/api/deleteFile/${file.id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        // Handle successful delete
        console.log('File deleted', data);
      })
      .catch(error => {
        // Handle error
        console.error('Error deleting file', error);
      });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    console.log('Download clicked');
    // Add your download logic here
    // For example, you might redirect to a download URL
    window.location.href = `/api/downloadFile/${file.id}`;
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex justify-center items-center w-full pl-5">
          <img src={threeDotsIcon} alt="Options" className="h-auto w-auto" />
        </MenuButton>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 -mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleDelete}
                  className={classNames(
                    active ? 'bg-blue-200 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full text-left',
                  )}
                >
                  <img
                    src={deleteIcon}
                    alt="Delete"
                    className="mr-3 h-7 w-7 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Delete
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleDownload}
                  className={classNames(
                    active ? 'bg-blue-200 text-gray-900' : 'text-gray-700',
                    'group flex items-center px-4 py-2 text-sm w-full text-left',
                  )}
                >
                  <img
                    src={downloadIcon}
                    alt="Download"
                    className="mr-3 h-7 w-7 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  Download
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default PopupContent;



// import './css/StaffMemberCard.css';
// // import DeactivateModal from './DeactivateModal';
// // import dummyStaffImage from '../../../../public/assets/dummyStaffImage.png';
// import deactivateButton from '../../../../public/assets/deactivateButton.png';
// const UserFilePopup = ({ name, role, status, imageUrl, onDeactivateClick, onDelete }) => {

//     const [isThreeDotPopupOpen, setIsThreeDotPopupOpen] = useState(false);
//     const threeDotButtonRef = useRef(null);

//     const toggleThreeDotButton = () => {
//         setIsThreeDotPopupOpen(!isThreeDotPopupOpen);
//     }

//     const openPopup = () => {
//         setIsThreeDotPopupOpen(true);
//         console.log("bukak");
//       };

//     const closePopup = () => {
//         setIsThreeDotPopupOpen(false);
//         console.log("tutup");
//       };

//     const openDeactivateModal = () => {
//         setIsThreeDotPopupOpen(false);
//         onDeactivateClick();
//     };

//     React.useEffect(() => {
//         const handleClickOutside = (event) => {
//           if (!event.target.closest(".popup")) {
//             closePopup();
//           }
//         };
    
//         if (isThreeDotPopupOpen) {
//           document.addEventListener("click", handleClickOutside);
//         }
    
//         return () => {
//           document.removeEventListener("click", handleClickOutside);
//         };
//       }, [isThreeDotPopupOpen]);

//       const handleIconClick = (e) => {
//         e.stopPropagation();
//         toggleThreeDotButton();
//       };

//     // Position popup next to the three dots icon button
//     const getPopupPosition = () => {
//         // const buttonRect = threeDotButtonRef.current.getBoundingClientRect();
//         return {
//             top: -8,
//             left: 90.5, // Add an offset to position it to the right of the button
//         };
//     };

//     const handleDelete = (e) => {
//         e.stopPropagation();
//         onDelete();
//         closePopup();
//       };
    
//       const handleDownload = (e) => {
//         e.stopPropagation();
//         e.preventDefault();
//         const qrImage = 'assets/hehe.png';
//         const link = document.createElement('a');
//         link.href = qrImage;
//         link.download = 'qr-image.png';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     return (
//         <div>
//             <button
//                 className="three-dot-button"
//                 onClick={toggleThreeDotButton}
//                 ref={threeDotButtonRef}
//             >
//                 <img style={{ width: '40px' }} src={threeDotsIcon} alt="Three dots" onClick={handleIconClick} />
//             </button>
//             {isThreeDotPopupOpen && (
//                 <div className="profile-files-popup2 text-sm">
//                     <div
//                         className="staff-member-popup6"
//                         style={{
//                             top: '-8px',
//                             left: `${getPopupPosition().left}px`,
//                             position: 'absolute',
//                             zIndex: 999, // Ensure it's above other elements
//                         }}
//                     >
//                         <img src="assets/🦆 icon _image_.svg" alt={name} className="staff-member-popup-image" />
//                         <button
//                             className="text-neutral-500 pr-2 mr-14"
//                             onClick={handleDelete}
//                         >
//                             Delete
//                         </button>
//                     </div>
//                     <div
//                         className="staff-member-popup7"
//                         style={{
//                             top: '33.5px',
//                             left: `${getPopupPosition().left}px`,
//                             position: 'absolute',
//                             zIndex: 999, // Ensure it's above other elements
//                         }}
//                     >
//                         <img src="assets/🦆 icon _lock_.svg" alt={name} className="staff-member-popup-image" />
//                         <button
//                             className="text-neutral-500 pr-2 mr-8"
//                             onClick={handleDownload}
//                         >
//                             Download
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
    
// };

// export default UserFilePopup;
