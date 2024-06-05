import React from 'react';

function ProfileNav({ activeTab, setActiveTab }) {
    return (
      <nav className="flex gap-5 justify-between mt-14 ml-28 mr-28 max-w-full text-sm font-semibold text-center whitespace-nowrap text-neutral-800 text-opacity-30 w-auto max-md:flex-wrap max-md:mt-10">
        <a href="#activities" className={`text-stone-300 ${activeTab === "activities" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("activities")}>Activities</a>
        <a href="#bio" className={`text-stone-300 ${activeTab === "bio" ? "text-blue-500" : ""}`} onClick={() => setActiveTab("bio")}>Bio</a>
        <a href="#gallery" className={`text-stone-300 ${activeTab === "gallery" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("gallery")}>Gallery</a>
        <a href="#files" className={`text-stone-300 ${activeTab === "files" ? "font-bold text-blue-500" : ""}`} onClick={() => setActiveTab("files")}>Files</a>
      </nav>
    );
}

export default ProfileNav;