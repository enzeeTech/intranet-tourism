import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <form>
      <label htmlFor="albumSearch" className="sr-only">Search album</label>
      <input
        type="text"
        id="albumSearch"
        className="px-6 py-3.5 text-lg leading-none rounded-[30px] text-neutral-950 w-full"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"  // Disable browser autocomplete
      />
    </form>
  );
};

export default SearchBar;
