import React from 'react';
import logo from '../../../public/assets/logo.png';
import search from '../../../public/assets/search.png';
import notification from '../../../public/assets/notification.png';
import profileDummy from '../../../public/assets/profileDummy.png';
import './Reusable/css/General.css';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      <img src={logo} alt="Logo" className="h-12 ml-8" />

      <div className="relative flex items-center flex-grow mx-8">
        <img src={search} alt="Search" className="absolute w-6 h-6 transform -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          style={{ paddingLeft: '3rem'}}
        />
      </div>

      <div className="flex items-center">
        <button onClick={() => {}} className="focus:outline-none">
          <img src={notification} alt="Notification" className="w-4.5 h-6 mr-1" />
        </button>
        <a href="../profile">
        <img src={profileDummy} alt="Profile" className="w-12 h-12 ml-4 mr-2 rounded-full" />
        </a>
        <span className="mr-2 font-semibold">Username</span>
      </div>
    </header>
  );
};

export default Header;