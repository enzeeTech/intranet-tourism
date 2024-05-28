import React, { useState } from "react";
import Invite from '../DepartmentCom/invPopup'; // Adjust the import path as needed


function Avatar({ src, alt, className }) {
  return <img loading="lazy" src={src} alt={alt} className={className} />;
}

function UserInfo({ name, role }) {
  return (
    <div className="flex flex-col my-auto">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="mt-5 text-xs font-medium">{role}</p>
    </div>
  );
}

function UserCard({ src, alt, name, role }) {
  return (
    <div className="flex gap-5 text-neutral-800">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.95] w-[62px]" />
      <UserInfo name={name} role={role} />
    </div>
  );
}

function MemberCard({ src, alt, name, role }) {
  return (
    <div className="flex gap-5 mt-5 text-neutral-800">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.98] w-[60px]" />
      <div className="flex flex-col grow shrink-0 self-start mt-3 basis-0 w-fit">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-5 text-xs font-medium">{role}</p>
      </div>
    </div>
  );
}

function DpMembers() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [members, setMembers] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f9f8a2bc91be026f18ae2b910894bb4c40cbd422082493fb0a3d64699d672ce?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&",
      alt: "Profile picture of Aisha Binti (Department)",
      name: "Aisha Binti (Department)",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6818c205733ee62f02df7aaa6ad01846d2d560ef6aad5ee20d9f8c784e96ef9e?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&",
      alt: "",
      name: "Nur Shakilla Binti Ramli",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)"
    }
  ]);
  const [showInvite, setShowInvite] = useState(false);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredMembers = members.filter(member =>
      member.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredMembers);
  };

  const handleInviteClick = () => {
    setShowInvite(true);
  };

  const handleCloseInvite = () => {
    setShowInvite(false);
  };

  return (
    <section className="flex flex-col px-6 pt-8 pb-20  rounded-3xl shadow-sm max-w-[800px] h-auto max-md:px-5">
      <div className="flex gap-3.5 text-base font-bold text-white max-md:flex-wrap max-md:max-w-full ">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="flex-grow px-7 py-4 bg-gray-100 rounded-3xl text-neutral-800 text-opacity-30 max-md:px-5 max-md:max-w-full"
          style={{ width: "900px" }}
          placeholder="Search Member"
        />
        <button
          onClick={handleSearch}
          className="justify-center px-6 py-4 text-center whitespace-nowrap bg-blue-500 rounded-3xl max-md:px-5"
        >
          Search
        </button>
        <button
          onClick={handleInviteClick}
          className="justify-center px-11 py-4 text-center whitespace-nowrap bg-red-500 rounded-3xl max-md:px-5"
        >
          Invite
        </button>
      </div>
      <header className="flex gap-5 self-start mt-6 whitespace-nowrap">
        <h1 className="text-2xl font-bold text-black">Admin</h1>
        <span className="text-lg font-semibold text-stone-300">1</span>
      </header>
      <UserCard
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d1f53e6a8abf50125abe82b6e279b4b722c466ecdf073fb5465d78b036a9cab2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
        alt="Profile picture of Aisyah binte Musa"
        name="Aisyah binte Musa"
        role="Pejabat Timbalan Ketua Pengarah (Promosi)"
      />
      <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:max-w-full">
        <section className="flex flex-col">
          <div className="flex gap-5 whitespace-nowrap">
            <h2 className="grow text-2xl font-bold text-black">Members</h2>
            <span className="flex-auto text-lg font-semibold text-stone-300">
              {members.length}
            </span>
          </div>
          {searchResults.length === 0 ? (
            members.map((member, index) => (
              <MemberCard
                key={index}
                src={member.src}
                alt={member.alt}
                name={member.name}
                role={member.role}
              />
            ))
          ) : (
            searchResults.map((member, index) => (
              <MemberCard
                key={index}
                src={member.src}
                alt={member.alt}
                name={member.name}
                role={member.role}
              />
            ))
          )}
        </section>
        <Avatar
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c58b794fabc4e92d227bdf9620942466bcd49998c3663a1da1f9d932397a921?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&"
          alt=""
          className="shrink-0 self-end mt-14 w-10 aspect-[1.47] max-md:mt-10"
        />
      </div>
      {showInvite && <Invite onClose={handleCloseInvite} />}
    </section>
  );
}

export default DpMembers;
