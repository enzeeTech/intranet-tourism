import React from 'react';
import logo from '../../../public/assets/logo.png';
import search from '../../../public/assets/search.png';
import notification from '../../../public/assets/notification.png';
import profileDummy from '../../../public/assets/profileDummy.png';


const Header = () => {
  return (
    <header className="z-10 flex items-center justify-between p-4 bg-white shadow-md ">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-12 mr-12" />
        <div className="relative w-1/2">
            <img src={search} alt="Search" className="absolute w-6 h-6 top-2 left-2" />
          <input type="text" placeholder="Search..." className="w-full py-2 pl-12 pr-4 text-black border-none" />
        </div>
      </div>
      <div className="flex items-center">
        <img src={notification} alt="Notification" className="w-4.5 h-5 mr-6" />
        <img src={profileDummy} alt="Profile" className="w-12 h-12 mr-1 rounded-full " />
        <span className="mx-2 font-semibold ">Username</span>
      </div>
    </header>
  );
};

export default Header;
