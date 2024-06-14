import React, { useState, useEffect } from "react";
import { usePage } from '@inertiajs/react';

const ProfileCard = ({ name, status }) => {
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
    <div className="flex gap-3 hover:bg-blue-100 w-full px-0 py-5 mt-2 rounded-xl">

      <div className="relative flex items-center h-16 sm:h-[75px] ml-2 ">
        <img
          loading="lazy"
          src="/assets/person.svg"
          alt={`${name}'s portrait`}
          className="shrink-0 w-16 h-16 sm:w-[75px] sm:h-[75px] rounded-full"
        />
        <div
          className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getStatusIndicatorClass(status)}`}
        />
      </div>
      <div className="flex flex-col self-start mt-2.5">
        <div className="text-base sm:text-lg font-extrabold">{name}</div>
        <div className="mt-2 sm:mt-0 text-sm">Timbalan Pengarah Kanan</div>
        <div className="mt-2 sm:mt-4 text-xs text-neutral-800 text-opacity-50">{status}</div>
      </div>
    </div>
  );
};

const MyComponent = () => {
  const { props } = usePage();
  const { id } = props; // Access the user ID from props
  const [userName, setUserName] = useState('');
  const [statusFilter, setStatusFilter] = useState("Online");

  useEffect(() => {
    console.log("Fetching user data...");
    fetch("/api/crud/users", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User data fetched:", data); // Log fetched data
        if (data && data.data) {
          const users = Array.isArray(data.data) ? data.data : data.data.data;
          console.log("Parsed user data:", users); // Log parsed user data
          const currentUserData = users.find((user) => user.id === id);
          if (currentUserData) {
            setUserName(currentUserData.name);
          } else {
            console.log(`User with ID ${id} not found in fetched data.`);
          }
        } else {
          console.log("No user data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const filteredUsers = userName && statusFilter === "Online" ? [{ name: userName, status: "Online" }] : [];

  console.log("Filtered users:", filteredUsers);

  return (
    <div className="w-full min-h-screen bg-slate-100">
      <section className="flex flex-col items-center py-10">
        <header className="font-sans text-3xl sm:text-4xl font-extrabold text-neutral-800 mt-10 mb-6 w-full sm:w-96 sm:absolute left-5 sm:left-20">
          Who’s Online
          <div className="font-extrabold text-neutral-800 mt-2 mb-6 border-b-2 border-neutral-300"></div>
        </header>
        <div className="container max-w-screen-lg bg-white py-6 px-4 rounded-xl mt-10 sm:mt-40 mb-40 items-start shadow-2xl mx-5">
          <div className="flex flex-col text-neutral-800 ">
            <header className="text-xl sm:text-2xl font-extrabold text-neutral-800 ml-4">
                Online List
            </header>
            <div className="flex flex-row justify-start items-start sm:flex-row gap-2 sm:gap-4 mt-2 text-lg font-semibold text-neutral-800 ml-2 sm:ml-4 max-md:pr-5">
              <div className="relative flex items-center gap-1 sm:ml-0">
                <button
                  className={`grow ${statusFilter === "Online" ? "underline text-black" : "text-gray-700 text-opacity-50"}`}
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
                  className={`grow ${statusFilter === "Away" ? "underline text-black" : "text-gray-700 text-opacity-50"}`}
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
                  className={`grow ${statusFilter === "Offline" ? "underline text-black" : "text-gray-700 text-opacity-50"}`}
                  onClick={() => handleStatusFilter("Offline")}
                >
                  Offline
                </button>
                <div
                  className={`w-3 h-3 rounded-full border-2 border-white ${statusFilter === "Offline" ? "bg-red-500" : "bg-red-500 opacity-50"}`}
                />
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              filteredUsers.map((online, index) => (
                <ProfileCard
                  key={index}
                  name={online.name}
                  status={online.status}
                />
              ))
            ) : (
              <p className="ml-4 mt-2">No users found</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyComponent;
