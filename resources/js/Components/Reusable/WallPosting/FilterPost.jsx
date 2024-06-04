import React, { useState } from "react";

function MenuItem({ src, alt, text }) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded-md cursor-pointer">
      <img loading="lazy" src={src} alt={alt} className="shrink-0 aspect-square w-[21px]" />
      <span className="my-auto text-neutral-800">{text}</span>
    </div>
  );
}

function IconMenu() {
  const menuItems = [
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/206f67ee2b58618f2c710e12ff29852a94c07b8a9ab92c6681c10b5d14e697fc?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "All Posts Icon", text: "All posts" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1f91136ebb20d771918144a6eb483013f3dfef5e58357a6d1f065dffb3e281f?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Photos Icon", text: "Photos" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e25ca2700e4fa6fee6a7908fb086fdeea4583acc02cc61369cbb5b893fc4f23a?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Videos Icon", text: "Videos" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8cefdb57714d0ea0ce1a2f7d8483a18e7a92510bf0fba488fb22f7dda9ee71a3?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Polls Icon", text: "Polls" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9d647e26a4c0bcc3aaba78265f4f44175d6b85659892e967badba341d8c23616?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Announcements Icon", text: "Announcements" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a5be22e3b2642281374aea1c99bd59c3bc983331970e371d5a2c29ebca703eb?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Files Icon", text: "Files" },
    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bf9e6661a0ac6cc1ec7e0dbda7cda73637d1209c1959ba50fc10c783fd7ed12d?apiKey=285d536833cc4168a8fbec258311d77b&", alt: "Mentions Icon", text: "Mentions" }
  ];

  return (
    <aside className="absolute flex flex-col p-2 bg-white rounded-lg shadow-lg w-[200px] text-neutral-800 mt-[430px]">
      {menuItems.map((item, index) => (
        <React.Fragment key={index}>
          <MenuItem src={item.src} alt={item.alt} text={item.text} />
          {index !== menuItems.length - 1 && (
            <hr className="my-2 border-gray-300" />
          )}
        </React.Fragment>
      ))}
    </aside>
  );
}


export default Filter;
