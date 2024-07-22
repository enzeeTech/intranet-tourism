import React from 'react';

function Popup({ title, content, onClose, onSave }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
            <div className="w-[350px] bg-white p-6 rounded-2xl shadow-custom max-w-md" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
                <p className="mb-2">{content}</p>
                <div className="flex justify-center mt-4 text-sm">
                    <button onClick={onClose} className="mr-2 bg-white text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full">Cancel</button>
                    <button onClick={onSave} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Save</button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
