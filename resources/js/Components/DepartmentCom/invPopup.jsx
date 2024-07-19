import React, { useEffect, useRef, useState } from 'react';

// SearchBar Component
function SearchBar({ onChange }) {
  return (
    <form className="flex justify-center items-center text-lg rounded-md text-neutral-800 text-opacity-50 w-full">
      <label className="sr-only" htmlFor="searchInput">Search people</label>
      <input
        id="searchInput"
        type="text"
        placeholder="Search people"
        className="w-[500px] h-[43px] rounded-[30px] border-2 p-2"
        aria-label="Search people"
        onChange={onChange}
        style={{ borderColor: 'initial', outline: 'none' }}
        onFocus={(e) => (e.target.style.borderColor = 'blue')}
        onBlur={(e) => (e.target.style.borderColor = 'initial')}
      />
    </form>
  );
}

// UserItem Component
function UserItem({ imgSrc, name, department }) {
  return (
    <div className="flex gap-5 justify-between mt-4 w-full text-base font-bold text-neutral-800">
      <div className="flex gap-4">
        <img loading="lazy" src={imgSrc} alt={`${name} (${department})`} className="shrink-0 aspect-square w-[51px]" />
        <div className="flex-auto my-auto">{name} ({department})</div>
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/afd4cff5615c81e4549bbff7d3511d39799f17675eb7bff11c31371818aff1f8?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&" alt="" className="shrink-0 my-auto w-4 aspect-square" />
    </div>
  );
}

// Invite Component
function Invite({ onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const users = [
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "Aisha Binti", department: "Department" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "John Doe", department: "Sales" },
    { imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9419b503653a3e9877c5f4645f1692737a3fd9cd52fcad5fa8fd9077eaedc3c2?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&", name: "Jane Smith", department: "Marketing" }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <section ref={popupRef} className="flex flex-col pt-6 pb-5 bg-white rounded-2xl shadow-sm max-w-[431px]">
        <header className="flex gap-5 self-center max-w-full text-lg font-extrabold text-center text-neutral-800 w-[431px] px-2">
          <div className="flex-auto text-xl mb-4 font-bold">Invite people</div>
          {/* <button onClick={onClose} className="s">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5c01ea628264d796f4bd86723682019081b89678cb8451fb7b48173e320e5ff?apiKey=d66b6c2c936f4300b407b67b0a5e8c4d&" alt="" className="shrink-0 w-6 aspect-square" />
          </button> */}
        </header>
        <main className="flex flex-col items-center px-4 w-full">
          <SearchBar onChange={handleSearchChange} />
          {filteredUsers.map((user, index) => (
            <UserItem key={index} imgSrc={user.imgSrc} name={user.name} department={user.department} />
          ))}
          <div className="flex gap-5 mt-6 self-end text-sm text-center">
            <button className="my-auto font-semibold text-neutral-800" onClick={onClose}>Cancel</button>
            <button className="justify-center px-6 py-2.5 bg-blue-500 rounded-full font-bold text-white">Save</button>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Invite;
