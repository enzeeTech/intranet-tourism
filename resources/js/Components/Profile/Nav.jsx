import React from 'react';

function ProfileNav({ activeTab, setActiveTab }) {
    return (
      <nav className="flex gap-5 justify-between mt-14 ml-10 max-w-full text-sm font-semibold text-center whitespace-nowrap text-neutral-800 text-opacity-30 w-[423px] max-md:flex-wrap max-md:mt-10">
        <a href="#activities" className={`text-stone-300 ${activeTab === "activities" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("activities")}>Activities</a>
        <a href="#bio" className={`text-base font-bold ${activeTab === "bio" ? "text-blue-500" : ""}`} onClick={() => setActiveTab("bio")}>Bio</a>
        <a href="#gallery" className={`${activeTab === "gallery" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("gallery")}>Gallery</a>
        <a href="#files" className={`${activeTab === "files" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("files")}>Files</a>
      </nav>
    );
}

export default ProfileNav;