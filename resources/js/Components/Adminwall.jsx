import * as React from 'react';
import { useState } from 'react';
import DpMembers from '../Components/DepartmentCom/DepartmentMembers';
import { ShareYourThoughtsDepart } from '@/Components/Reusable/WallPosting';
import {  SearchInput, SearchButton, Table } from "../Components/ProfileTabbar";
import {ImageProfile, VideoProfile,} from "../Components/ProfileTabbar/Gallery"
import { Filter } from '@/Components/Reusable/WallPosting';


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
    <header className="flex overflow-hidden relative flex-col px-11 py-9 w-full text-white min-h-[235px] max-md:px-5 max-md:max-w-full rounded-t-xl">
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
            />
          </button>
        </div>
      </div>
      <div className="relative mt-5 text-base font-medium leading-5 max-md:max-w-full">
        {isEditing ? (
          <textarea
            className="w-full h-32 p-2 text-white bg-inherit focus:outline-none focus:ring focus:ring-blue-500"
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
      <div className="absolute inset-x-0 bottom-0 flex justify-start items-center gap-4 px-11 py-4 max-md:px-5">
        {isEditing ? (
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center" onClick={handleSaveClick}>
            Save
          </button>
        ) : (
          <button className="w-8 h-8 px-1 py-1 bg-blue-500 text-white rounded-full flex items-center justify-center" onClick={handleEditClick}>
            <img
              src="/assets/pencil.svg"
              alt="Edit Icon"
              className="w-4 h-4 "
            />
          </button>
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

  const photoData = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/19dbe4d9d7098d561e725a31b63856fbbf81097ff193f1e5b04be40ccd3fe081?", alt: "Photo 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?", alt: "Photo 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01566f85a165f9e8c89da57eaa7e81212a8fa1e58ed53877c900bf64c5baf1?", alt: "Photo 3" },
  ];

  const videoData = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbaca5c344dcb79e33b324a787c8c2119e2929aebc1bda0bf551ae62ef74fc?", alt: "Video 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?", alt: "Video 2" },
  ];

  return (
    <div>
      <nav className="flex  gap-5 items-start px-9 py-6  w-full text-sm font-semibold text-center bg-white rounded-b-2xl shadow-xl text-stone-300 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className={`cursor-pointer ${activeTab === 'Post' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Post')}>Post</div>
        <div className={`cursor-pointer ${activeTab === 'Gallery' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Gallery')}>Gallery</div>
        <div className={`cursor-pointer ${activeTab === 'Files' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Files')}>Files</div>
        <div className={`cursor-pointer ${activeTab === 'Members' ? 'text-blue-500' : ''}`} onClick={() => handleTabClick('Members')}>Members</div>
      </nav>

      {activeTab === 'Members' && (
        <div className="flex justify-center w-full mt-4 ">
          <div className="max-w-[900px] w-full  border-inherit rounded-2xl shadow-2xl">
            <DpMembers />
          </div>
        </div>
      )}

      {activeTab === "Files" && (
        <div>
          <div className="flex gap-4 whitespace-nowrap ml-12">
            <SearchInput />
            <SearchButton />
          </div>
          <Table />
        </div>
      )}

      {/* {activeTab === "Gallery" && (
        <ProfileGallery photoData={photoData} videoData={videoData} />
      )} */}
  {activeTab === "Gallery" && (
                                <section>
                                    <ImageProfile selectedItem="All" />
                                    <VideoProfile selectedItem="All" />
                                </section>
)}


      {activeTab === 'Post' && (
        <div className="flex flex-col max-w-[900px] shadow-2xl pb-6 rounded-xl mt-6">
          <div className="max-w-[900px] w-full  whitespace-nowrap absolute content-items">
            <ShareYourThoughtsDepart /><br></br>
            <Filter/>
          </div>
        </div>
      )}
    </div>
  );
}

function Adminsection() {
  return (
    <div className='w-[875px]'>
      <HeaderSection />
      <Navigation />
    </div>
  );
}

export default Adminsection;
