import React, { useState, useEffect, useRef } from 'react';
import Invite from '../DepartmentCom/invPopup'; 

function Avatar({ src, alt, className, status }) {
  const imageUrl = src === '/assets/dummyStaffPlaceHolder.jpg' ? src : `/avatar/full/${src}`;
  return (
    <div className="relative items-center justify-end h-16">
      <img loading="lazy" src={imageUrl} alt={alt} className={className} />
      {status === 1 && (
        <div className="absolute bottom-0 right-0 border-2 border-white bg-red-500 rounded-full w-[12px] h-[12px] mb-1"></div>
      )}
      {status === 2 && (
        <div className="absolute bottom-0 right-0 border-2 border-white bg-green-500 rounded-full w-[12px] h-[12px] mb-1"></div>
      )}
    </div>
  );
}

function UserInfo({ name, role, isActive }) {
  return (
    <div className="flex flex-col ml-2">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold">{name} </h2>
        {isActive && <span className="font-semibold text-red-500 text-l">(Deactivated)</span>}
      </div>
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

const PopupMenu = ({ onAssign, onRemove }) => (
  <div className="absolute right-0 z-50 bg-white border shadow-lg w-[190px] rounded-xl -mt-3">
    <button onClick={onAssign} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-t-xl">
      <img src="/assets/personIcon.svg" alt="Assign" className="w-6 h-6 mr-2" /> 
      Assign file manager
    </button>
    <button onClick={onRemove} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:rounded-b-xl">
      <img src="/assets/🦆 icon _image_.svg" alt="Remove" className="w-6 h-6 mr-2" /> 
      Remove
    </button>
  </div>
);


const MemberCard = ({ id, imageUrl, name, title, status, isActive, onAssign, onRemove, activePopupId, setActivePopupId, closePopup }) => {
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const handleDotClick = () => {
    if (activePopupId === id) {
      closePopup();
    } else {
      setActivePopupId(id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupRef, closePopup]);

  return (
    <div className="relative flex p-2 text-neutral-800 rounded-2xl align-center">
      <Avatar src={imageUrl} className="shrink-0 aspect-[0.95] w-[62px] rounded-full mb-4" status={status} />
      <UserInfo name={name} role={title} isActive={isActive} />
      <div className="ml-auto">
        <button ref={buttonRef} onClick={handleDotClick} className="relative p-2">
          <img src="/assets/threedots.svg" alt="Menu" className="h-6 w-13" />
        </button>
        {activePopupId === id && (
          <div ref={popupRef}>
            <PopupMenu
              onAssign={() => onAssign(id)}
              onRemove={() => onRemove(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

function DpMembers() {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [members, setMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showInvite, setShowInvite] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);

  const getDepartmentIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('departmentId');
  };

  useEffect(() => {
    const fetchData = async () => {
      const departmentId = getDepartmentIdFromQuery();
      const url = `/api/crud/employment_posts?department_id=${departmentId}`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const fetchedMembers = data.members || [];
        
        setMembers(fetchedMembers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredMembers = members.filter((member) =>
      member.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchResults(filteredMembers);
  }, [searchInput, members]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleInviteClick = () => {
    setShowInvite(true);
  };

  const handleCloseInvite = () => {
    setShowInvite(false);
  };

  const handleAssign = (id) => {
    console.log(`Assign file manager for member with id: ${id}`);
    closePopup();
  };

  const handleRemove = (id) => {
    console.log(`Remove member with id: ${id}`);
    closePopup();
  };

  const closePopup = () => {
    setActivePopupId(null);
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
          onClick={handleSearchChange}
          className="items-center justify-center px-4 py-2 text-center bg-[#4780FF] rounded-full hover:bg-blue-700 text-md whitespace-nowrap"
        >
          Search
        </button>
        <button
          onClick={handleInviteClick}
          className="items-center justify-center px-4 py-2 text-center bg-[#FF5437] rounded-full hover:bg-red-700 text-md whitespace-nowrap"
        >
          Add Member
        </button>
      </div>

      <header className="flex self-start gap-5 mt-6 whitespace-nowrap">
        <h1 className="text-2xl font-bold text-black">Admin</h1>
        <span className="text-xl mt-0.5 font-semibold text-stone-300">{admins.length}</span>
      </header>

      {admins.map((admin, index) => (
        <UserCard key={index} src={admin.src} alt={admin.alt} name={admin.name} role={admin.role} status={admin.status} />
      ))}

      <div className="flex justify-between gap-5 mt-10 max-md:flex-wrap max-md:max-w-full">
        <section className="flex flex-col w-full">
          <div className="flex gap-5 mb-2 whitespace-nowrap">
            <h2 className="text-2xl font-bold text-black grow">
              Members
              <span className="ml-4 text-xl mt-0.5 font-semibold text-stone-300">{displayedMembers.length}</span>
            </h2>
          </div>
          {displayedMembers.map((member, index) => (
            <MemberCard
              key={index}
              id={member.user_id}
              imageUrl={member.image}
              name={member.name}
              title={member.title}
              isActive={member.is_active}
              activePopupId={activePopupId}
              setActivePopupId={setActivePopupId}
              onAssign={handleAssign}
              onRemove={handleRemove}
              closePopup={closePopup}
            />
          ))}
        </section>
      </div>
      {showInvite && <Invite onClose={handleCloseInvite} />}
    </section>
  );
}

export default DpMembers;
