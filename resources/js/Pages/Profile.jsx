import * as React from "react";
import { ProfileHeader, ProfileNav, Popup, OnlinePerson } from "@/Components/Profile";
import { ProfileBio, ProfileGallery, ProfileIcons, SearchInput, SearchButton, Table } from "@/Components/ProfileTabbar"
import { FeaturedEvent } from "@/Components/SideCalendar";


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
        phone: "+601140734567 / 8094",
        icon1: "https://cdn.builder.io/api/v1/image/assets/TEMP/a0d746200134b6c0b2b351a65359ead31f7593bfb6991980b20df113b691a7de?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
        icon2: "https://cdn.builder.io/api/v1/image/assets/TEMP/c509bd2e6bfcd3ab7723a08c590219ec47ac648338970902ce5e506f7e419cb7?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&",
      };

  const featuredEvents = [
    {
      date: "19 Jan",
      title: "Conference",
      time: "January 19, 2024, 12:30 PM",
     },
    {
      date: "21 Jan",
      title: "Corporate event",
      time: "January 21, 2024, 08:00 AM",
      },
    {
      date: "12 FEB",
      title: "Exhibition",
      time: "February 12, 2024, 07:00 PM",
      },
  ];

  const onlinePeople = [
    { name: "Aisha", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/376195b3b258450870181e0368716e43967ba2add24022ffc3bb3ffbb5dd7bee?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" },
    { name: "Thomas", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/557a3a9ef665e83f524fc1c634d953ebdc2600e0cb646828b9139aba2daf7a4a?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" },
    { name: "Ben", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/95eec02c2752ac9b9a4ad1afbf079ac84fe22af11f4be69053033b6719de251c?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" },
    { name: "Sarah", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cb285b185a4c05341ac3879c28b38168eb2d15128282a61017ba3229600a840?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" },
    { name: "Nik", imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/1371d1db42581f9e74ea98761f867e47963c0e4ded2d8acbb9d1747172ee55ae?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&" },
  ];

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
    <div className="pt-2.5">
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
          <div className="flex flex-col grow px-5 mt-20 max-md:mt-10">
            <h2 className="text-3xl font-bold text-neutral-800">My Profile</h2>
            <section className="flex flex-col px-4 py-5 mt-9 w-full bg-white rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold text-neutral-800">
                Featured Events
              </h3>
              {featuredEvents.map((event) => (
                <FeaturedEvent key={event.title} {...event} />
              ))}
              <div className="flex gap-2 mt-4 text-xs font-semibold uppercase text-neutral-800 max-md:pr-5">
                  <a href="../calendar">
                    <div className="my-auto">view all</div>
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/94038c67d19dccbc5e7edb68bf4b9e991042ccf0a6c1a73a67760cbeb4b2d1e9?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                        alt=""
                        className="shrink-0 aspect-[1.25] w-[15px]"
                      />
                  </a>
              </div>
            </section>
            <section className="flex flex-col px-3 py-4 mt-14 w-full bg-white rounded-2xl shadow-sm max-md:mt-10">
              <h3 className="text-2xl font-bold text-neutral-800">
                Who's Online
              </h3>
              <div className="flex gap-1 px-1.5 mt-2.5">
                {onlinePeople.map((person) => (
                  <OnlinePerson key={person.name} {...person} />
                ))}
              </div>
              <div className="flex gap-4 mx-3 text-xs font-semibold text-center whitespace-nowrap text-neutral-800 max-md:mx-2.5">
                {onlinePeople.map((person) => (
                  <div key={person.name}>{person.name}</div>
                ))}
              </div>
              <div className="flex gap-2 mt-3 text-xs font-semibold uppercase text-neutral-800 max-md:pr-5">
                <div className="my-auto">view all</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/94038c67d19dccbc5e7edb68bf4b9e991042ccf0a6c1a73a67760cbeb4b2d1e9?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                  alt=""
                  className="shrink-0 aspect-[1.25] w-[15px]"
                />
              </div>
            </section>
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
              <section className="flex gap-5 px-8 py-4 mt-6 w-full bg-white rounded-lg shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div className="flex-auto my-auto max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    <ProfileBio
                      email={profileData.email}
                      department={profileData.department}
                      position={profileData.position}
                      grade={profileData.grade}
                      location={profileData.location}
                      phone={profileData.phone}
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