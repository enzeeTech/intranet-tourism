import React, { useState } from "react";


function MenuItem({ icon, label }) {
  return (
    <div className="flex relative gap-3 self-start mt-2.5 ml-3.5 text-xs font-semibold whitespace-nowrap text-neutral-800 text-opacity-50">
      <img loading="lazy" src={icon} alt="" className="shrink-0 aspect-square w-[21px]" />
      <div className="my-auto">{label}</div>
    </div>
  );
}

function Divider() {
  return (
    <div className="relative mt-2 w-full bg-gray-300 border border-gray-300 border-solid min-h-[1px]" />
  );
}

function IconMenu() {
  const menuItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/206f67ee2b58618f2c710e12ff29852a94c07b8a9ab92c6681c10b5d14e697fc?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "All posts" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1f91136ebb20d771918144a6eb483013f3dfef5e58357a6d1f065dffb3e281f?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "Photos" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e25ca2700e4fa6fee6a7908fb086fdeea4583acc02cc61369cbb5b893fc4f23a?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "Videos" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8cefdb57714d0ea0ce1a2f7d8483a18e7a92510bf0fba488fb22f7dda9ee71a3?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "Polls" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9d647e26a4c0bcc3aaba78265f4f44175d6b85659892e967badba341d8c23616?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "Announcements" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a5be22e3b2642281374aea1c99bd59c3bc983331970e371d5a2c29ebca703eb?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", label: "Files" },
  ];

  return (
    <div className="absolute top-[calc(100%+5px)] left-0 flex overflow-hidden flex-col pt-2.5 aspect-[0.59] fill-white max-w-[154px] z-10">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/743380e53168b0abd38a1c1d726751754c6d2e5b8bac375f1a9846c394229bca?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" alt="" className="object-cover absolute inset-0 size-full" />
      
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <MenuItem icon={item.icon} label={item.label} />
          <Divider />
        </React.Fragment>
      ))}
      
      <div className="flex relative gap-3 self-start mt-1.5 ml-3.5 whitespace-nowrap">
        <div className="justify-center items-center text-xs font-extrabold text-center text-blue-500 rounded-full bg-slate-100 h-[21px] w-[21px]">
          @
        </div>
        <div className="my-auto text-xs font-semibold text-neutral-800 text-opacity-50">
          Mentions
        </div>
      </div>
    </div>
  );
}

function Filter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col justify-center text-sm max-w-[132px] text-neutral-800 relative">
      <div
        className="flex gap-5 justify-between px-4 py-3 bg-white rounded-2xl shadow-lg"
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
      {isOpen && <IconMenu />}
    </div>
  );
}

export default Filter;
