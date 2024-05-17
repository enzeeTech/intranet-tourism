import React, { useState } from "react";

const ProfileCard = ({ name, role, status, imageSrc, altText }) => {
  const getStatusIndicatorClass = (status) => {
    switch (status) {
      case "Online":
        return "bg-green-500";
      case "Away":
        return "bg-yellow-500";
      case "Offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex gap-3 hover:bg-blue-100 w-full px-5 py-5">
    <div className="relative flex items-center h-16 sm:h-[75px]">
        <img
          loading="lazy"
          src={imageSrc}
          alt={altText}
          className="shrink-0 w-16 h-16 sm:w-[75px] sm:h-[75px] rounded-full"
        />
        <div
          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getStatusIndicatorClass(status)}`}
        />
      </div>
    <div className="flex flex-col self-start mt-2.5">
      <div className="text-base sm:text-lg font-extrabold">{name}</div>
      <div className="mt-1 sm:mt-2 text-sm">{role}</div>
      <div className="mt-2 sm:mt-4 text-xs text-neutral-800 text-opacity-50">{status}</div>
    </div>
  </div>
  );
};

const MyComponent = () => {
  const profiles = [
    { name: "Iskander Mirza", role: "Pengarah Kanan", status: "Online", imageSrc: "/assets/smile.jpg", altText: "Iskander Mirza's Portrait" },
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
    <div className="w-full bg-slate-100">
      <section className="flex flex-row justify-center gap-5 rounded-xl shadow-lg max-w-1920 max-md:flex-wrap max-md:pl-5 max-h-full">
      <header className="text-3xl sm:text-4xl font-extrabold text-neutral-800 mt-10 mb-6 w-full sm:w-96 sm:absolute left-5 sm:left-20">
          Who’s Online
          <div className="font-extrabold text-neutral-800 mt-2 mb-6 border-b-2 border-neutral-300"></div>
        </header>
        <div className="container max-w-screen-lg bg-white py-10 rounded-xl mt-10 sm:mt-40 mb-40 items-start shadow-2xl">
          <div className="flex flex-col text-neutral-800 px-4 sm:px-10">
            <header className="text-xl sm:text-2xl font-extrabold text-neutral-800 ml-2 sm:ml-0">
              Online List
            </header>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-5 text-lg font-semibold text-neutral-800 ml-2 sm:ml-0 max-md:pr-5">
  <div className="relative flex items-center gap-1 sm:ml-10">
    <button
      className={`grow ${statusFilter === "Online" && "underline"} ${statusFilter === "Online" && "text-black-500"}`}
      onClick={() => handleStatusFilter("Online")}
    >
      Online
    </button>
    <div
      className={`w-3 h-3 rounded-full border-2 border-white ${statusFilter === "Online" ? "bg-green-500" : "bg-green-500 opacity-50"}`}
    />
  </div>
  <div className="relative flex items-center gap-1">
    <button
      className={`grow ${statusFilter === "Away" && "underline"} ${statusFilter === "Away" && "text-black-500"}`}
      onClick={() => handleStatusFilter("Away")}
    >
      Away
    </button>
    <div className="w-6 h-6 rounded-full border-2 border-white">
      {statusFilter === "Away" ? (
        <img src="/assets/awayicon1.svg" alt="Active Away Icon" className="w-full h-full" />
      ) : (
        <img src="/assets/awayicon.svg" alt="Inactive Away Icon" className="w-full h-full opacity-50" />
      )}
    </div>
  </div>
  <div className="relative flex items-center gap-1">
    <button
      className={`grow ${statusFilter === "Offline" && "underline"} ${statusFilter === "Offline" && "text-black-500"}`}
      onClick={() => handleStatusFilter("Offline")}
    >
      Offline
    </button>
    <div
      className={`w-3 h-3 rounded-full border-2 border-white ${statusFilter === "Offline" ? "bg-red-500" : "bg-red-500 opacity-50"}`}
    />
  </div>
</div>

            {profiles
              .filter((profile) => profile.status === statusFilter)
              .map((profile, index) => (
                <ProfileCard key={index} {...profile} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyComponent;
