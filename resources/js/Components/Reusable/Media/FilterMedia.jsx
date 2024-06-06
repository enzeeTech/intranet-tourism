import React, { useState } from "react";

function MenuItem({ label, onClick }) {
  return (
    <div
      className="menu-item p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
}

const Filter = ({ menuItems, onSelectMedia }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState('All');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedMedia(item);
    setIsOpen(false); // Close the dropdown after selection
    onSelectMedia(item); // Notify the parent component about the selection
  };

  // Calculate the width of the container based on the length of the selected item
  const containerWidth = selectedMedia === 'All' ? 132 : selectedMedia.length * 10 + 40; // Adjust multiplier and add padding/margins as needed

  return (
    <div className="flex flex-col justify-center text-sm max-w-full text-neutral-800 relative">
      <div
        style={{ width: containerWidth }}
        className="flex gap-5 justify-between px-4 py-3 bg-white rounded-2xl shadow-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <div>{selectedMedia}</div>
        <img
          loading="lazy"
          src="assets/Dropdownarrow.svg"
          alt="Decorative icon"
          className={`shrink-0 my-auto aspect-[1.89] stroke-[2px] w-[15px] ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && (
        <div className="absolute flex flex-col p-2 bg-white rounded-lg shadow-lg w-auto text-neutral-800 mt-52">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <MenuItem label={item} onClick={handleSelect} />
              {index !== menuItems.length - 1 && (
                <hr className="my-2 border-gray-300" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
