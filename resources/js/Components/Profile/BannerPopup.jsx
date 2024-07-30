import * as React from "react";
import { useState } from "react";

function Popup({ title, onClose, onSave, onSelectFile }) {
  const [fileNames, setFileNames] = useState([]);

  const handleClickImg = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const files = Array.from(event.target.files);
      setFileNames(files.map(file => file.name));

      if (onSelectFile) {
        onSelectFile(event); // Pass the event to the onSelectFile function
      } else {
        console.error("onSelectFile is not defined");
      }
    };
    fileInput.click();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={onClose}>
      <div className="flex flex-col py-4 px-8 bg-white rounded-3xl shadow-custom max-w-[350px]" onClick={(e) => e.stopPropagation()}>
        <div className="flex gap-5 items-start text-neutral-800">
          <div className="flex flex-col grow shrink-0 mt-3.5 basis-0 w-fit">
            <div className="text-xl font-bold">{title}</div>
            <div className="flex gap-5 mt-4 text-base font-medium">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f866987dac766e7c7baf2f103208e42a078a207c09f4684986fefda5837d21a?"
                className="shrink-0 aspect-square w-[27px] cursor-pointer"
                onClick={handleClickImg}
              />
              <div className="flex-auto my-auto cursor-pointer" onClick={handleClickImg}>
                Choose photo from the device
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-end mt-3.5 mb-4 font-bold text-center">
          <div
            className="file-names-container flex flex-wrap gap-2"
            style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {fileNames.map((name, index) => (
              <div
                className="flex items-center px-2 py-1 bg-white rounded-lg shadow"
                key={index}
                style={{ maxWidth: "150px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                <div className="file-name text-xs truncate">
                  {name}
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-white text-sm text-gray-400 border border-gray-400 hover:bg-gray-400 hover:text-white px-4 py-2 rounded-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <div
            className="flex flex-col justify-center text-xs text-white cursor-pointer"
            onClick={onSave}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white px-4 py-2 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
