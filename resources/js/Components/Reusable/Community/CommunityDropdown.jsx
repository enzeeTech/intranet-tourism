import React, { useState } from 'react';

function MenuItem({ src, alt, text, onClick }) {
  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded-md cursor-pointer"
      onClick={() => onClick(text)}
    >
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="shrink-0 aspect-square w-[21px]"
      />
      <span className="my-auto text-neutral-800">{text}</span>
    </div>
  );
}

function IconMenu({ onSelectFilter, closeDropdown }) {
  const menuItems = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/206f67ee2b58618f2c710e12ff29852a94c07b8a9ab92c6681c10b5d14e697fc?apiKey=285d536833cc4168a8fbec258311d77b&",
      alt: "All Posts Icon",
      text: "All",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1f91136ebb20d771918144a6eb483013f3dfef5e58357a6d1f065dffb3e281f?apiKey=285d536833cc4168a8fbec258311d77b&",
      alt: "Photos Icon",
      text: "Public",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e25ca2700e4fa6fee6a7908fb086fdeea4583acc02cc61369cbb5b893fc4f23a?apiKey=285d536833cc4168a8fbec258311d77b&",
      alt: "Videos Icon",
      text: "Private",
    },
  ];

  return (
    <aside className="absolute flex flex-col p-2 bg-white rounded-lg shadow-lg w-[200px] text-neutral-800 mt-[200px] z-10">
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <MenuItem
            src={item.src}
            alt={item.alt}
            text={item.text}
            onClick={(text) => {
              onSelectFilter(text);
              closeDropdown(); // Close the dropdown after selecting an option
            }}
          />
          {index !== menuItems.length - 1 && (
            <hr className="my-2 border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </aside>
  );
}

function Filter({ onSelectFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col absolute justify-center text-sm max-w-[132px] text-neutral-800 relative mr-96 -mb-2 -mt-6">
      <div
        className="flex gap-5 justify-between px-4 py-3 bg-white rounded-2xl shadow-lg mb-4"
        onClick={toggleDropdown}
      >
        <div>All posts</div>
        <img
          loading="lazy"
          src="assets/Dropdownarrow.svg"
          alt="Decorative icon"
          className={`shrink-0 my-auto aspect-[1.89] stroke-[2px] w-[15px] ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {isOpen && <IconMenu onSelectFilter={onSelectFilter} closeDropdown={closeDropdown} />}
    </div>
  );
}

export default Filter;
