import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvent from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import { ProfileHeader, ProfileNav, Popup, } from "@/Components/Profile";
import { ProfileBio, ProfileGallery, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar";


export default function MyComponent() {

  const [activeTab, setActiveTab] = React.useState("activities");
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const profileData = {
        backgroundImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/51aef219840e60eadf3805d1bd5616298ec00b2df42d036b6999b052ac398ab5?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
        profileImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/b68c042fe15637d83658e190705206009d4017b640a612fd4286280043e4c258?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
        name: "Aisyah binte Musa",
        status: "Online",
        email: "aisyahbintemusa@tourism.gov.my",
        department: "Pejabat Timbalan Ketua Pengarah (Promosi)",
        position: "Tetap",
        grade: "N11",
        location: "Tingkat 18",
        phone: "+0388918094",
        whatsapp: "+60 14 971 8736",
        icon1: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0d746200134b6c0b2b351a65359ead31f7593bfb6991980b20df113b691a7de?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      };


  const photoData = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/19dbe4d9d7098d561e725a31b63856fbbf81097ff193f1e5b04be40ccd3fe081?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Photo 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Photo 2" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fc01566f85a165f9e8c89da57eaa7e81212a8fa1e58ed53877c900bf64c5baf1?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Photo 3" },
  ];

  const videoData = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbaca5c344dcb79e33b324a787c8c2119e2929aebc1bda0bf551ae62ef74fc?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Video 1" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ff48e71a83368a201973d09bb65d5bec5cda3d234d40d8216049d60b55179fe1?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&", alt: "Video 2" },
  ];

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSavePopup = () => {
    // save logic here
    closePopup();
  };



  return (
    <div className="staff-directory">
      {isPopupOpen && (
        <Popup
          title="Edit Banner Photo"
          content="Choose photo from the device"
          onClose={closePopup}
          onSave={handleSavePopup}
        />
      )}
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <aside className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col px-5 mt-20 grow max-md:mt-10">
          <div className="staff-directory-header">
          <PageTitle title="Profile" />
        </div>
        <hr className="staff-directory-underline" />
          <div className="widgets-container">
            <div className="left-widget">
              <FeaturedEvent />
              <WhosOnline />
            </div>
          </div>
          </div>
        </aside>
        <main className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-2.5 max-md:mt-10 max-md:max-w-full">
            <section className="flex flex-col pb-5 bg-white rounded-none shadow-sm max-md:max-w-full">
              <ProfileHeader
                backgroundImage={profileData.backgroundImage}
                profileImage={profileData.profileImage}
                name={profileData.name}
                status={profileData.status}
                onEditBanner={openPopup}
              />
              <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />
            </section>
            {activeTab === "bio" && (
              <section className="flex w-full gap-5 px-8 py-4 mt-6 bg-white rounded-lg shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div className="flex-auto my-auto max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <ProfileBio
                      email={profileData.email}
                      department={profileData.department}
                      position={profileData.position}
                      grade={profileData.grade}
                      location={profileData.location}
                      phone={profileData.phone}
                      whatsapp={profileData.whatsapp}
                    />
                    <ProfileIcons icon1={profileData.icon1} icon2={profileData.icon2} />
                  </div>
                </div>
              </section>
            )}
            {activeTab === "gallery" && (
              <ProfileGallery photoData={photoData} videoData={videoData} />
            )}
            {activeTab === "files" && (
              <div>
              <div className="flex gap-4 whitespace-nowrap">
                  <SearchInput />
                  <SearchButton />
              </div>
                <Table />
              </div>
              )}
          </div>
        </main>
    </div>
    </div>
  );
}