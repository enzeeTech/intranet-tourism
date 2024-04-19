import React from 'react';

function SearchInput() {
    return (
      <div className="flex min-w-72 gap-2 px-5 py-1.5 text-md bg-white rounded-full border border-solid border-neutral-200 text-neutral-800 text-opacity-50 mt-8">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9a74adec558c689d2c2036311d5dad5a1cc1d44aea0cf5f88c1bd1bafeea3ce?apiKey=285d536833cc4168a8fbec258311d77b&"
          alt=""
          className="shrink-0 w-6 aspect-square"
        />
        <input
          type="text"
          className="flex-auto bg-transparent border-none outline-none text-md text-neutral-800"
          placeholder="Search"
        />
      </div>
    );
}
  
function SearchButton() {
    return (
      <button className="justify-center px-5 py-1.5 my-auto text-s font-bold text-center text-white bg-blue-500 rounded-3xl mt-10">
        Search
      </button>
    );
}
  
export { SearchInput, SearchButton };