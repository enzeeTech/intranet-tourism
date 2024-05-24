import * as React from 'react';
import { useState } from 'react';

function HeaderSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [textContent, setTextContent] = useState('Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setTextContent(e.target.value);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <header className="flex overflow-hidden relative flex-col px-11 py-9 w-full text-white min-h-[235px] max-md:px-5 max-md:max-w-full rounded-xl">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdd4e4b7e0f9ec45df838993c39761806ac75e1cc6917f44849c00849e5e2f19?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
        className="object-cover absolute inset-0 size-full"
        alt=""
      />
      <div className="flex relative gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold">Bahagian Pentadbiran</h1>
          <h2 className="mt-4 text-lg font-medium">Department</h2>
        </div>
        <div className="flex gap-5 justify-between self-start text-sm font-medium content-center">
          <button className="my-auto flex flex-row gap-4">Group Admin
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/599b835164fff4e10552e23d04cdbdcfdb56df70e81b9264a82c878534e22499?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
            className="shrink-0 w-8 aspect-square"
            alt="Admin Avatar"
          /></button>
        </div>
      </div>
      <div className="relative mt-5 text-base font-medium leading-5 max-md:max-w-full">
        {isEditing ? (
          <textarea
            className="w-full h-32 p-2 text-black"
            value={textContent}
            onChange={handleInputChange}
          />
        ) : (
          textContent
        )}
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4ed48051cb5cb802fc585e5dc4525ddee2547b00e05bf15b875d0202cc7db34?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
        className="mt-6 aspect-square w-[30px]"
        alt="Section Icon"
      />
      <div className="absolute inset-x-0 bottom-0 flex justify-between items-center gap-4 px-11 py-4 max-md:px-5">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Join</button>
        {isEditing ? (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleSaveClick}>Save</button>
        ) : (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </header>
  );
}

function Navigation() {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
 
  return (
    <nav className="flex gap-5 items-start px-9 py-6 w-full text-sm font-semibold text-center whitespace-nowrap bg-white rounded-none text-stone-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
      <div className={`text-base font-bold ${activeTab === 'Home' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Home')}>Home</div>
      <div className={`cursor-pointer ${activeTab === 'Gallery' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Gallery')}>Gallery</div>
      <div className={`cursor-pointer ${activeTab === 'Files' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Files')}>Files</div>
      <div className={`cursor-pointer ${activeTab === 'Members' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Members')}>Members</div>
      {activeTab === 'Members' && <DpMembers />} {/* Render DpMembers component when Members tab is active */}
    </nav>
  );
}

function Adminsection() {
  return (
    <div className="flex flex-col max-w-[900px] border-2 border-red-300 bg-white shadow-2xl pb-6 rounded-xl mt-6">
      <HeaderSection />
      <Navigation />
    </div>
  );
}

export default Adminsection;
