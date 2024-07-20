import React, { useState, useEffect } from 'react';
import Invite from '../DepartmentCom/invPopup'; // Adjust the import path as needed

function Avatar({ src, alt, className, status }) {
  return (
    <div className="relative items-center justify-end h-16">
      <img loading="lazy" src={src} alt={alt} className={className} />
      {status === 1 && (
        <div className="absolute bottom-0 right-0 border-2 border-white bg-red-500 rounded-full w-[12px] h-[12px] mb-1"></div>
      )}
      {status === 2 && (
        <div className="absolute bottom-0 right-0 border-2 border-white bg-green-500 rounded-full w-[12px] h-[12px] mb-1"></div>
      )}
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
    <div className="flex p-2 text-neutral-800 hover:bg-blue-100 rounded-2xl align-center">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.95] w-[62px] rounded-full mb-4" status={status} />
      <UserInfo name={name} role={role} />
    </div>
  );
}

function MemberCard({ src, alt, name, role, status }) {
  return (
    <div className="flex p-2 text-neutral-800 hover:bg-blue-100 rounded-2xl align-center">
      <Avatar src={src} alt={alt} className="shrink-0 aspect-[0.95] w-[62px] rounded-full mb-4" status={status} />
      <UserInfo name={name} role={role} />
    </div>
  );
}

function DpMembers() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: { Accept: 'application/json' },
      };
  
      try {
        const response = await fetch('/api/crud/employment_posts', options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        const fetchedMembers = data.members || [];
        const fetchedAdmins = data.admins || [];
  
        setMembers(fetchedMembers);
        setAdmins(fetchedAdmins);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    const filteredMembers = members.filter((member) =>
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
    <section className="flex flex-col h-auto max-w-full p-6 shadow-sm rounded-3xl max-md:px-5">
      <div className="flex items-center gap-3.5 text-base font-bold text-white max-md:flex-wrap max-md:max-w-full">
        <input
          type="text"
          value={searchInput}
          onChange={handleSearchChange}
          className="flex-grow px-4 py-2 bg-gray-100 border-gray-100 rounded-full text-md text-neutral-800 max-md:px-5 max-md:max-w-full"
          placeholder="Search Member"
        />
        <button
          onClick={handleSearch}
          className="items-center justify-center px-4 py-2 text-center bg-blue-500 rounded-full hover:bg-blue-700 text-md whitespace-nowrap"
        >
          Search
        </button>
        <button
          onClick={handleInviteClick}
          className="items-center justify-center px-4 py-2 text-center bg-red-600 rounded-full hover:bg-red-700 text-md whitespace-nowrap"
        >
          Invite
        </button>
      </div>

      <header className="flex self-start gap-5 mt-6 whitespace-nowrap">
        <h1 className="text-2xl font-bold text-black">Admin</h1>
        <span className="text-lg font-semibold text-stone-300">{admins.length}</span>
      </header>

      {admins.map((admin, index) => (
        <UserCard key={index} src={admin.src} alt={admin.alt} name={admin.name} role={admin.role} status={admin.status} />
      ))}

      <div className="flex justify-between gap-5 mt-10 max-md:flex-wrap max-md:max-w-full">
        <section className="flex flex-col w-full">
          <div className="flex gap-5 whitespace-nowrap">
            <h2 className="text-2xl font-bold text-black grow">
              Members
              <span className="ml-4 text-lg font-semibold text-stone-300">{displayedMembers.length}</span>
            </h2>
          </div>
          {displayedMembers.map((member, index) => (
            <MemberCard key={index} src={member.src} alt={member.alt} name={member.name} role={member.role} status={member.status} />
          ))}
        </section>
      </div>
      {showInvite && <Invite onClose={handleCloseInvite} />}
    </section>
  );
}

export default DpMembers;
