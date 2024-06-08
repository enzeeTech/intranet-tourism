import React, { useState } from "react";

const ProfileCard = ({ name, role, status, imageSrc, altText }) => (
  <div className="flex gap-3 mt-10 hover:bg-blue-100 w-full">

    <img loading="lazy" src={imageSrc} alt={altText} className="shrink-0 aspect-[0.97] w-[68px]" />
    <div className="flex flex-col self-start mt-2.5">
      <div className="text-lg font-extrabold">{name}</div>
      <div className="mt-2 text-sm">{role}</div>
      <div className="mt-4 text-xs text-neutral-800 text-opacity-50">{status}</div>
    </div>

  </div>
);

const MyComponent = () => {
  const profiles = [
    { name: "Iskander Mirza", role: "Pengarah Kanan", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b69229fef789e65ccbbd40f5084486249b34607e63cbed1fb5f8163bdb13848d?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Iskander Mirza's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6954c899b9516ae5758ea91f8d51a68d4b0239ba37bbe41db764c7680a6f3b25?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Nor Rahimah Binti Ariffin", role: "Setiausaha Pejabat", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c43d93545cf604bc894b11a43e5bf867b2f30f33f4fd4e7302d371c6fc6cd2cc?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Nor Rahimah Binti Ariffin's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Away", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d92ce50067115f60fa94f3675e4a836947ca7e839206e7618b8c3ea3aae032f?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Offline", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/863d540b8b11568ee552694df1f5331c01430254c682474061825b671ca1f620?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Iskander Mirza", role: "Pengarah Kanan", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/b69229fef789e65ccbbd40f5084486249b34607e63cbed1fb5f8163bdb13848d?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Iskander Mirza's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/6954c899b9516ae5758ea91f8d51a68d4b0239ba37bbe41db764c7680a6f3b25?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Nor Rahimah Binti Ariffin", role: "Setiausaha Pejabat", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/c43d93545cf604bc894b11a43e5bf867b2f30f33f4fd4e7302d371c6fc6cd2cc?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Nor Rahimah Binti Ariffin's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Away", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5d92ce50067115f60fa94f3675e4a836947ca7e839206e7618b8c3ea3aae032f?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Offline", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/863d540b8b11568ee552694df1f5331c01430254c682474061825b671ca1f620?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
    { name: "Edzuar Zar Bin Ayob Azari", role: "Timbalan Pengarah Kanan", status: "Online", imageSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9073ec69c990f59e63adb3c1bc5bef83837496a800b7347ced2f2725efac325e?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", altText: "Edzuar Zar Bin Ayob Azari's Portrait" },
  ];

  const [statusFilter, setStatusFilter] = useState("Online");

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  return (
    <section className=" object-center	 flex flex-center gap-5 justify-between pt-7 pr-2 pb-2.5 pl-9 bg-slate-200 rounded-xl shadow-sm max-w-1920 max-md:flex-wrap max-md:pl-5">

<div class="container max-w-screen-md  bg-white px-10 py-10 rounded-xl ">
      <div className="flex flex-col text-neutral-800 ">
        <header className="text-2xl font-extrabold text-neutral-800">Online List</header>
        <div className="flex gap-5 mt-5 text-lg font-semibold whitespace-nowrap text-neutral-800 max-md:pr-5 ">
          <div className="flex flex-1 gap-1">
            <button className={`grow ${statusFilter === "Online" && "underline"} ${statusFilter === "Online" && "text-black-500"}`} onClick={() => handleStatusFilter("Online")}>Online</button>
            <div className={`shrink-0 self-start w-3 h-3 bg-green-500 rounded-full border-2 border-white border-solid stroke-[2px] ${statusFilter !== "Online" && "opacity-0"}`} />
          </div>
          <div className="flex flex-1 gap-1">
            <button className={`grow ${statusFilter === "Away" && "underline"} ${statusFilter === "Away" && "text-black-500"}`} onClick={() => handleStatusFilter("Away")}>Away</button>
            <div className={`shrink-0 self-start w-3 h-3 bg-yellow-500 rounded-full border-2 border-white border-solid stroke-[2px]  ${statusFilter !== "Away" && "opacity-0"}`} />
          </div>
          <div className="flex flex-1 gap-1.5 self-start">
            <button className={`grow ${statusFilter === "Offline" && "underline"} ${statusFilter === "Offline" && "text-black-500"}`} onClick={() => handleStatusFilter("Offline")}>Offline</button>
            <div className={`shrink-0 self-start w-3 h-3 bg-red-500 rounded-full border-2 border-white border-solid stroke-[2px] ${statusFilter !== "Offline" && "opacity-0"}`} />
          </div>
        </div>
        {profiles
          .filter((profile) => profile.status === statusFilter)
          .map((profile, index) => (
            <ProfileCard key={index} {...profile} />
          ))}
      </div>
      {/* <aside className="flex flex-col items-start my-auto max-md:hidden"> */}

        {/* <div className="flex gap-5 self-stretch"> */}
          {/* <div className="flex flex-col flex-1 self-end mt-16 max-md:hidden max-md:mt-10">
            <div className="shrink-0 w-3 h-3 bg-green-500 rounded-full" />
            <div className="shrink-0 mt-24 w-3 h-3 bg-green-500 rounded-full max-md:mt-10" />
            <div className="shrink-0 mt-24 w-3 h-3 bg-green-500 rounded-full max-md:mt-10" />
          </div> */}
          {/* <div className="shrink-0 w-2 h-80 rounded bg-zinc-300" /> */}
        {/* </div> */}
        {/* <div className="shrink-0 mt-20 w-3 h-3 bg-green-500 rounded-full max-md:mt-10" />
        <div className="shrink-0 mt-24 w-3 h-3 bg-green-500 rounded-full max-md:mt-10" />
        <div className="shrink-0 mt-24 w-3 h-3 bg-green-500 rounded-full max-md:mt-10" />
      </aside> */}
  </div>
    </section>
  );
};

export default MyComponent; 
