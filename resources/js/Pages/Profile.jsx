import * as React from "react";


function ProfileImage({ src, alt, className }) {
  return (
    <div className={`flex overflow-hidden relative z-10 flex-col items-end px-16 pt-20 pb-3.5 mt-44 mb-0 w-44 max-w-full aspect-square max-md:px-5 max-md:mt-10 max-md:mb-2.5 ${className}`}>
      <img src={src} alt={alt} className="object-cover absolute inset-0 size-full" />
      <div className="relative shrink-0 mt-16 w-5 h-5 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] max-md:mt-10 left-10" />
    </div>
  );
}

function ProfileHeader({ backgroundImage, profileImage, name, status }) {
  return (
    <header className="flex overflow-hidden relative z-10 flex-col items-start px-7 pt-20 -mt-14 w-half min-h-[270px] max-md:px-5 max-md:max-w-half">
      <img src={backgroundImage} alt="" className="object-cover absolute inset-0 size-half" />
      <ProfileImage src={profileImage} alt={`${name}'s profile picture`} />
      <div className="flex flex-col self-center px-5 -mt-10 -ml-96">
        <h1 className="self-end text-3xl font-extrabold text-neutral-800">{name}</h1>
        <div className="mt-2 text-xs font-semibold text-neutral-800 text-opacity-50">{status}</div>
      </div>
    </header>
  );
}

function ProfileNav() {
  return (
    <nav className="flex gap-5 justify-between mt-14 ml-10 max-w-full text-sm font-semibold text-center whitespace-nowrap text-neutral-800 text-opacity-30 w-[423px] max-md:flex-wrap max-md:mt-10">
      <a href="#activities" className="text-stone-300">Activities</a>
      <a href="#bio" className="text-base font-bold text-blue-500">Bio</a>
      <a href="#gallery">Gallery</a>
      <a href="#files">Files</a>
    </nav>
  );
}

function ProfileDetails({ email, department, position, grade, location, phone }) {
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

function ProfileIcons({ icon1, icon2 }) {
  return (
    <div className="flex flex-col">
      <img src={icon1} alt="" className="aspect-square w-[30px]" />
      <img src={icon2} alt="" className="self-center mt-36 aspect-square w-[38px] max-md:mt-10" />
    </div>
  );
}


function FeaturedEvent({ date, title, time }) {
  const [day, month] = date.split(" ");

  return (
    
      <div className="flex gap-3 p-2 border-b border-l-gray-200">
        <div className="flex flex-col pb-2.5 font-bold text-center whitespace-nowrap bg-red-500 rounded-lg shadow-sm h-[64px] w-[54px]">
          <div className="justify-center px-5 py-3 text-xs bg-white rounded-md text-neutral-800">
            {day}
          </div>
          <div className="self-center mt-0 text-xs text-white uppercase">
            {month}
          </div>
        </div>
        <div className="flex flex-col self-start text-sm font-semibold">
          <div className="font-bold text-neutral-800">{title}</div>
          <div className="mt-0.1 text-neutral-400">{time}</div>
          <div className="mt-1.5 text-xs text-sky-500 underline">More</div>
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

export default function MyComponent() {

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

  return (
    <div className="pt-2.5">
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
            <div className="flex flex-col pb-5 w-full bg-white rounded-none shadow-sm max-md:max-w-full">
           <ProfileHeader
              backgroundImage={profileData.backgroundImage}
              profileImage={profileData.profileImage}
              name={profileData.name}
              status={profileData.status}
            />
            <ProfileNav />
          </div>
              
              
            </section>
            <section className="flex gap-5 px-8 py-4 mt-6 w-full bg-white rounded-lg shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex-auto my-auto max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <ProfileDetails
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
          </div>
        </main>
      </div>
    </div>
  );
}