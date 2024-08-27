import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <form>
      <label htmlFor="albumSearch" className="sr-only">Search album</label>
      <input
        type="text"
        id="albumSearch"
        className="px-4 py-3 font-base text-md rounded-full bg-gray-100 border-gray-100 w-full mb-4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"  // Disable browser autocomplete
      />
    </form>
  );
};

export default SearchBar;
