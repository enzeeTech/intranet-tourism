import * as React from "react";

function ProfileImage({ src, alt, className }) {
  return (
    <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-44 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className}`}>
      <img src={src} alt={alt} className="object-cover absolute inset-0 size-full" />
      <div className="relative shrink-0 mt-16 w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] max-md:mt-10 left-10" />
    </div>
  );
}

function ProfileHeader({ backgroundImage, profileImage, name, status, onEditBanner }) {
  const handleEditBanner = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating to parent elements
    onEditBanner(); // Calls the onEditBanner function when the background image is clicked
  };
  return (
    <header
      className="flex overflow-hidden relative z-10 flex-col items-start px-7 pt-20 -mt-14 w-half min-h-[270px] max-md:px-5 max-md:max-w-half"
      onClick={handleEditBanner} // Added onClick handler to trigger onEditBanner
    >
      <img src={backgroundImage} alt="" className="object-cover absolute inset-0 size-half" />
      <ProfileImage src={profileImage} alt={`${name}'s profile picture`} />
      <div className="flex flex-col self-center px-5 -mt-10 -ml-96">
        <h1 className="self-end text-3xl font-extrabold text-neutral-800">{name}</h1>
        <div className="mt-2 text-xs font-semibold text-neutral-800 text-opacity-50">{status}</div>
      </div>
    </header>
  );
}

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

function ProfileBio({ email, department, position, grade, location, phone }) {
  return (
    <div className="flex-auto my-auto max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[36%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow text-base font-semibold capitalize text-neutral-800 max-md:mt-10">
            <div>e-mail</div>
            <div className="mt-6">department</div>
            <div className="mt-8">position</div>
            <div className="mt-7">grade</div>
            <div className="mt-7">location</div>
            <div className="mt-7">mob/Ext number</div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[64%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow text-sm text-neutral-800 text-opacity-80 max-md:mt-10">
            <div>{email}</div>
            <div className="mt-8">{department}</div>
            <div className="mt-8">{position}</div>
            <div className="mt-8">{grade}</div>
            <div className="mt-8">{location}</div>
            <div className="mt-8">{phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoItem({ src, alt }) {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="grow shrink-0 mt-8 max-w-full aspect-[1.19] w-[173px] max-md:mt-10"
      />
    </div>
  );
}

function VideoItem({ src, alt }) {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <img
        loading="lazy"
        src={src}
        alt={alt}
        className="grow shrink-0 mt-8 max-w-full aspect-[1.19] w-[173px] max-md:mt-10"
      />
    </div>
  );
}

function ProfileGallery({ photoData, videoData }) {
  return (
    <div className="flex flex-col max-w-[800px]">
      <section className="px-6 py-6 w-full bg-white rounded-md shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-2xl font-bold whitespace-nowrap text-neutral-800 max-md:mt-10">
              <h2>Photo</h2>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b964b38ab4577424894ab89afca98d210e5a3ab6ee6f4091065c1b0e53df2748?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                alt="Main Photo"
                className="self-center mt-3.5 aspect-[1.19] w-[172px]"
              />
            </div>
          </div>
          {photoData.map((photo, index) => (
            <PhotoItem key={index} src={photo.src} alt={photo.alt} />
          ))}
        </div>
      </section>
      <section className="px-6 py-6 w-full bg-white rounded-md shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-2xl font-bold whitespace-nowrap text-neutral-800 max-md:mt-10">
              <h2>Videos</h2>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cdbbaca5c344dcb79e33b324a787c8c2119e2929aebc1bda0bf551ae62ef74fc?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                alt="Video 1"
                className="self-center mt-3.5 aspect-[1.92] w-[172px]"
              />
            </div>
          </div>
          {videoData.map((video, index) => (
            <VideoItem key={index} src={video.src} alt={video.alt} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SearchInput() {
  return (
    <div className="flex min-w-72 gap-2 px-5 py-1.5 text-md bg-white rounded-full border border-solid border-neutral-200 text-neutral-800 text-opacity-50 mt-8">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9a74adec558c689d2c2036311d5dad5a1cc1d44aea0cf5f88c1bd1bafeea3ce?apiKey=285d536833cc4168a8fbec258311d77b&"
        alt=""
        className="shrink-0 w-6 aspect-square"
      />
      <input
        type="text"
        className="flex-auto bg-transparent border-none outline-none text-md text-neutral-800"
        placeholder="Search"
      />
    </div>
  );
}

function SearchButton() {
  return (
    <button className="justify-center px-5 py-1.5 my-auto text-s font-bold text-center text-white bg-blue-500 rounded-3xl mt-10">
      Search
    </button>
  );
}

function ProfileIcons({ icon1, icon2 }) {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [qrCodeLink, setQrCodeLink] = React.useState('');

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log("bukak");
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    console.log("tutup");
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".popup")) {
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isPopupOpen]);

  const handleDownload = (e) => {
    e.stopPropagation();
    e.preventDefault(); // Prevent the default behavior of the anchor element
    const qrImage = 'assets/hehe.png'; // Path to the QR image
    const link = document.createElement('a');
    link.href = qrImage;
    link.download = 'qr-image.png'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleCopyLink = () => {
    const qrCodeLink = "https://shattereddisk.github.io/rickroll/rickroll.mp4";
    navigator.clipboard.writeText(qrCodeLink)
      .then(() => {
        console.log("QR code link copied to clipboard:", qrCodeLink);
        window.alert("QR code link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy QR code link:", error);
      });
  };
  

  const handleIconClick = (e) => {
    e.stopPropagation();
    openPopup();
  };
  
  return (
    <div className="flex flex-col">
      <img src={icon1} alt="" className="aspect-square w-[30px]" />
      <img
        src={icon2}
        alt=""
        className="self-center mt-36 aspect-square w-[38px] max-md:mt-10 cursor-pointer"
        onClick={handleIconClick}
      />
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" onClick={closePopup}>
          <div className="bg-white p-2 rounded-xl shadow-lg max-w-md" onClick={(e) => e.stopPropagation()}>
            <img
              src="assets/hehe.png"
              alt="QR Code"
              className="mx-auto mt-4"
            />
            <div className="flex justify-between -mt-1 relative">
              <hr className="absolute -top-3 w-full border-t border-gray-300" />
                <button onClick={handleDownload} className="text-white px-24 py-2 rounded-md">
                  <img src="assets/DownloadIcon.png" alt="Download Icon" className="w-8 h-8" />
                </button>
              <hr className="absolute top-0 right-52 h-full border-l border-gray-300" />
                <button onClick={handleCopyLink} className="text-white px-24 py-2 rounded-md">
                  <img src="assets/CopyLinkIcon.png" alt="Copy Link Icon" className="w-8 h-8" />
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
}



function FeaturedEvent({ date, title, time }) {
  const [day, month] = date.split(" ");

  const handleMoreClick = () => { 
    
    console.log('More clicked!');
    // Add more code here to perform specific actions, like opening a modal or navigating to a new page 
    window.location.href = 'https://www.example.com/';
  };

  return (
    <div className="flex gap-3 p-2 border-b border-l-gray-200">
      <div className="flex flex-col pb-2.5 font-bold text-center whitespace-nowrap bg-red-500 rounded-lg shadow-sm h-[64px] w-[54px]">
        <div className="justify-center px-5 py-3 text-xs bg-white rounded-t-md text-neutral-800">
          {day}
        </div>
        <div className="self-center mt-1 text-xs text-white uppercase">
          {month}
        </div>
      </div>
      <div className="flex flex-col self-start text-sm font-semibold">
        <div className="font-bold text-neutral-800">{title}</div>
        <div className="mt-.5 text-neutral-400">{time}</div>
        {/* Make the "More" text clickable */}
        <div
          className="mt-2.5 text-xs text-sky-500 underline cursor-pointer"
          onClick={handleMoreClick} // Attach the click event handler 
        > 
          More
        </div>
      </div>
    </div>
  );
}

function OnlinePerson({ name, imageUrl }) {
  return (
      <img
        loading="lazy"
        src={imageUrl}
        alt={name}
        className="shrink-0 w-11 aspect-[0.95]"
      />
  );
}

function Popup({ title, content, onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 bg-gray-200 px-4 py-2 rounded-md">Cancel</button>
          <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
        </div>
      </div>
    </div>
  );
}

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
                <div className="my-auto">view all</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/94038c67d19dccbc5e7edb68bf4b9e991042ccf0a6c1a73a67760cbeb4b2d1e9?apiKey=23ce5a6ac4d345ebaa82bd6c33505deb&"
                  alt=""
                  className="shrink-0 aspect-[1.25] w-[15px]"
                />
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
              <div className="flex gap-4 whitespace-nowrap">
                <SearchInput />
                <SearchButton />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}