import React from 'react';
import Layout from '../Layouts/DashboardLayout';
import { OnlinePerson } from "@/Components/Profile";
import { FeaturedEvent } from "@/Components/SideCalendar";
import { Stories, Birthday } from '@/Components/Dashboard';

const Dashboard = () => {

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
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <div className="p-8">
            {/* Dashboard content goes here */}
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
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
        <div className="md:w-2/3 mt-3 md:ml-6">
          <div className="flex flex-col">
            <Stories />
            <Birthday />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

