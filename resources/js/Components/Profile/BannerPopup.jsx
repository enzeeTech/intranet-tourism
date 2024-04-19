import React from 'react';

function Popup({ title, content, onClose, onSave }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="mb-4">{content}</p>
          <div className="flex justify-end">
            <button onClick={onClose} className="mr-4 bg-gray-200 px-4 py-2 rounded-md">Cancel</button>
            <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          </div>
        </div>
      </div>
    );
}

export default Popup;