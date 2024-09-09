import React, { Fragment, useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import threeDotsIcon from '../../../../public/assets/threedots.svg';
import deleteIcon from '../../../../public/assets/deleteicon.svg';
import downloadIcon from '../../../../public/assets/downloadicon.svg';
import renameIcon from '../../../../public/assets/renameicon.svg';
import ViewIcon from '../../../../public/assets/ViewIcon.svg';
import ViewAdminPopup from '../Reusable/ViewAdminPopup';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PopupContent = ({ file, onRename, onDelete, onFileSelect }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!file || !file.id) {
    console.error('No file selected or file ID is missing.');
    return null;
  }

  const handleRename = (e, close) => {
    e.preventDefault();
    onRename();
    close();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowConfirm(true); // Show confirmation popup
  };

  const handleConfirmDelete = () => {
    onDelete(file.id);
    setShowConfirm(false); // Hide confirmation popup after deletion
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Hide confirmation popup
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/resources/resources?id=${file.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const fileObject = data.data.data.find((f) => f.id === file.id);

      if (!fileObject) {
        throw new Error('File not found in the API response');
      }

      const metadata = typeof fileObject.metadata === 'string'
        ? JSON.parse(fileObject.metadata)
        : fileObject.metadata;

      const fileUrl = `/storage/${metadata.path}`;
      const originalName = metadata.original_name || 'default_filename';

      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = originalName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download the file:', error);
    }
  };

  const handleViewClick = () => {
    if (file.metadata.path.endsWith('.pdf')) {
      const fileUrl = `/storage/${file.metadata.path}`;
      window.open(fileUrl, '_blank');
    } else {
      alert('Viewing is only available for PDF files.');
    }
  };

  const isPdf = file.metadata.path.endsWith('.pdf');

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex justify-center items-center w-full pl-5 max-md:pl-1">
            <img src={threeDotsIcon} alt="Options" className="h-auto w-auto" />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <MenuItem>
                {({ active, close }) => (
                  <button
                    onClick={(e) => handleRename(e, close)}
                    className={classNames(
                      active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
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
                      active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
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
                    onClick={handleDeleteClick} // Open confirmation popup
                    className={classNames(
                      active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm w-full'
                    )}
                  >
                    <img src={deleteIcon} alt="Delete" className="mr-3 h-5 w-5" />
                    Delete
                  </button>
                )}
              </MenuItem>
              {isPdf && (
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={handleViewClick}
                      className={classNames(
                        active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                        'group flex items-center px-4 py-2 text-sm w-full'
                      )}
                    >
                      <img src={ViewIcon} alt="View" className="mr-3 h-5 w-5" />
                      View
                    </button>
                  )}
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Transition>
      </Menu>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 text-lg">Are you sure you want to delete this file?</p>
            <div className="flex justify-end">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                No
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupContent;
