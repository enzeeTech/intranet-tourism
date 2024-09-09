import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'; // Adjusted import for v2

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
      <div className="bg-white rounded-lg shadow-lg max-w-sm mx-auto z-10">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-lg font-semibold">Confirm Deletion</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <p className="text-md text-gray-700">Are you sure you want to delete this file? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationModal;
