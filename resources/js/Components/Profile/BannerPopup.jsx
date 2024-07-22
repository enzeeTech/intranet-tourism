import * as React from "react";

function Popup({ title, onClose, onSave, onSelectFile }) {
  const handleClickImg = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
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
      <div className="flex flex-col py-2.5 pl-3 bg-white rounded-xl shadow-sm max-w-[330px]" onClick={(e) => e.stopPropagation()}>
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
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d7986dce07599ceb2e5628dea9fdbbf7b0d6801dfeb283d90ffedce0217a1cf?"
            className="shrink-0 w-5 aspect-square cursor-pointer" 
            onClick={onClose}
          />
        </div>
        <div className="flex gap-2 self-end mt-3.5 font-bold text-center">
          <div 
            className="justify-center px-3 py-2 text-xs whitespace-nowrap rounded-2xl border border-solid border-stone-300 text-neutral-400 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </div>
          <div 
            className="flex flex-col justify-center text-xs text-white cursor-pointer"
            onClick={onSave}
          >
            <div className="justify-center px-3.5 py-1.5 bg-blue-500 rounded-2xl">
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
