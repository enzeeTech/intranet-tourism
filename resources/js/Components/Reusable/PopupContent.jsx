import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import threeDotsIcon from '../../../../public/assets/threedots.svg';
import deleteIcon from '../../../../public/assets/deleteicon.svg';
import downloadIcon from '../../../../public/assets/downloadicon.svg';
import renameIcon from '../../../../public/assets/renameicon.svg';
import adminIcon from '../../../../public/assets/adminicon.svg';
import ViewAdminPopup from '../Reusable/ViewAdminPopup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PopupContent = ({ file, onRename, onDelete, onFileSelect }) => {
  if (!file || !file.id) {
    console.error("No file selected or file ID is missing.");
    return null; // or return some placeholder content
  }

  const handleRename = (e) => {
    e.preventDefault();
    const newFileName = prompt("Enter the new name for the file:", file.metadata.name);
    if (newFileName) {
      onRename(newFileName);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this file?")) {
      onDelete(file.id);
    }
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const fileUrl = `/api/downloadFile/${file.id}`;
    window.open(fileUrl, '_blank');
  };

  const handleManageAdminClick = (e) => {
    e.stopPropagation();
    onFileSelect(file); // Select this file for admin management
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex justify-center items-center w-full pl-5">
            <img src={threeDotsIcon} alt="Options" className="h-auto w-auto" />
          </MenuButton>
        </div>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleRename}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full'
                    )}
                  >
                    <img src={renameIcon} alt="Rename" className="mr-3 h-5 w-5" />
                    Rename
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleDownload}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full'
                    )}
                  >
                    <img src={downloadIcon} alt="Download" className="mr-3 h-5 w-5" />
                    Download
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleDelete}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full'
                    )}
                  >
                    <img src={deleteIcon} alt="Delete" className="mr-3 h-5 w-5" />
                    Delete
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleManageAdminClick}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full'
                    )}
                  >
                    <img src={adminIcon} alt="Manage Admin" className="mr-3 h-5 w-5" />
                    Manage Admin
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
};

export default PopupContent;
