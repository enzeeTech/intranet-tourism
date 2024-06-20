import React, { useState } from "react";
import Invite from '../DepartmentCom/invPopup'; // Adjust the import path as needed

function Avatar({ src, alt, className, status }) {
  return (
    <div className="relative">
      <img loading="lazy" src={src} alt={alt} className={className} />
      {status === 1 && <div className="absolute bottom-0 right-0 border-2 border-white bg-red-500 rounded-full w-[12px] h-[12px] mb-2"></div>}
      {status === 2 && <div className="absolute bottom-0 right-0 border-2 border-white bg-green-500 rounded-full w-[12px] h-[12px] mb-2"></div>}
    </div>
  );
}

function UserInfo({ name, role }) {
  return (
    <div className="flex flex-col ml-2">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-xs font-medium">{role}</p>
    </div>
  );
}

function UserCard({ src, alt, name, role, status }) {
  return (
    <div className="flex text-neutral-800">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.95] w-[62px] rounded-full mb-4" status={status} />
      <UserInfo name={name} role={role} />
    </div>
  );
}

function MemberCard({ src, alt, name, role, status }) {
  return (
    <div className="flex gap-5 mt-5 text-neutral-800">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.98] w-[62px] rounded-full mb-4" status={status} />
      <div className="flex flex-col grow shrink-0 self-start mt-3 basis-0 w-fit">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-xs font-medium">{role}</p>
      </div>
    </div>
  );
}

function DpMembers() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [members, setMembers] = useState([
    {
      src: "assets/women.avif",
      alt: "Profile picture of Aisha Binti (Department)",
      name: "Aisha Binti (Department)",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)",
      status: 1
    },
    {
      src: "assets/person.svg",
      alt: "",
      name: "Nur Shakilla Binti Ramli",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)",
      status: 2
    }
  ]);

  const [admins, setAdmins] = useState([
    {
      src: "assets/person.svg",
      alt: "Profile picture of Aisyah binte Musa",
      name: "Aisyah binte Musa",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)",
      status: 1
    },
    {
      src: "assets/person.svg",
      alt: "Profile picture of Aisyah binte Musa",
      name: "Jojo",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)",
      status: 2
    },
    {
      src: "assets/person.svg",
      alt: "Profile picture of Aisyah binte Musa",
      name: "Kamelion",
      role: "Pejabat Timbalan Ketua Pengarah (Promosi)",
      status: 1
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

  const displayedMembers = searchResults.length > 0 ? searchResults : members;

  return (
    <section className="flex flex-col px-6 pt-8 pb-20 rounded-3xl shadow-sm max-w-[800px] h-auto max-md:px-5">
      <style>
        {`
          .relative {
            position: relative;
            display: inline-block;
          }

          .absolute {
            position: absolute;
          }

          .bottom-0 {
            bottom: 0;
          }

          .right-0 {
            right: 0;
          }

          .bg-red-500 {
            background-color: #f56565;
          }

          .bg-green-500 {
            background-color: #48bb78;
          }

          .rounded-full {
            border-radius: 9999px;
          }

          .w-2 {
            width: 0.5rem;
          }

          .h-2 {
            height: 0.5rem;
          }

          .mb-2 {
            margin-bottom: 20px;
          }
        `}
      </style>
      <div className="flex gap-3.5 text-base font-bold text-white max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="flex-grow px-7 py-4 bg-gray-100 rounded-3xl border-gray-100 text-neutral-800 max-md:px-5 max-md:max-w-full"
          style={{ width: "581px", color: "rgba(128, 128, 128, 0.5)" }}
          placeholder="Search Member"
        />
        <button
          onClick={handleSearch}
          className="justify-center px-6 py-4 text-center whitespace-nowrap rounded-3xl max-md:px-5"
          style={{ backgroundColor: 'rgb(72, 128, 255)' }}
        >
          Search
        </button>
        <button
          onClick={handleInviteClick}
          className="justify-center px-11 py-4 text-center whitespace-nowrap rounded-3xl max-md:px-5"
          style={{ backgroundColor: 'rgb(255, 84, 54)' }}
        >
          Invite
        </button>
      </div>

      <header className="flex gap-5 self-start mt-6 whitespace-nowrap">
        <h1 className="text-2xl font-bold text-black">Admin</h1>
        <span className="text-lg font-semibold text-stone-300">{admins.length}</span>
      </header>

      {admins.map((admin, index) => (
        <UserCard
          key={index}
          src={admin.src}
          alt={admin.alt}
          name={admin.name}
          role={admin.role}
          status={admin.status}
        />
      ))}

      <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:max-w-full">
        <section className="flex flex-col">
          <div className="flex gap-5 whitespace-nowrap">
            <h2 className="grow text-2xl font-bold text-black">
              Members
              <span className="ml-4 text-lg font-semibold text-stone-300">
                {displayedMembers.length}
              </span>
            </h2>
          </div>
          {displayedMembers.map((member, index) => (
            <MemberCard
              key={index}
              src={member.src}
              alt={member.alt}
              name={member.name}
              role={member.role}
              status={member.status}
            />
          ))}
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
