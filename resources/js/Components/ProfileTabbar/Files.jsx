import React, { useState } from 'react';

function SearchInput() {
  return (
    <div className="flex min-w-72 gap-2 px-5 py-1.5 text-md bg-white rounded-full border border-solid border-neutral-200 text-neutral-800 text-opacity-50 mt-8">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9a74adec558c689d2c2036311d5dad5a1cc1d44aea0cf5f88c1bd1bafeea3ce?apiKey=285d536833cc4168a8fbec258311d77b&"
        alt="Search Icon"
        className="shrink-0 w-6 aspect-square"
      />
      <input
        type="text"
        className="w-full py-2 pr-4 text-black border-none input-focus-style"
        placeholder="Search"
      />
    </div>
  );
}

function SearchButton() {
  return (
  <button className="justify-center px-5 py-1.5 my-auto text-sm font-bold text-center text-white bg-blue-500 rounded-3xl mt-10">
    Search
  </button>
  );
}

const people = [
  { name: 'Briefing', File: 'PDF', Size: '12', Date: '12.10.2023' , Author: 'by Musa' },
  { name: 'Report', File: 'Doc', Size: '7.4', Date: '07.10.2023' , Author: 'by Musa' },
  { name: 'Statistics for the Report', File: 'XLSX', Size: '3', Date: '24.09.2023' , Author: 'by Musa' },
  { name: 'Data on the Report', File: 'XLSX', Size: '2.5', Date: '22.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  { name: 'Meeting Summary', File: 'Doc', Size: '8', Date: '15.09.2023' , Author: 'by Musa' },
  // More people...
]

export default function Table() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust the number of items per page

  // Calculate the total number of pages
  const pageCount = Math.ceil(people.length / itemsPerPage);

  // Get the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = people.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-3/4 px-4 sm:px-6 lg:px-0">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 shadow-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th scope="col" className="rounded-2xl bg-blue-200 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-lg">
                    Name
                  </th>
                  <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-3 shadow-lg">
                    File
                  </th>
                  <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-3 shadow-lg">
                    Size
                  </th>
                  <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-3 shadow-lg">
                    Date
                  </th>
                  <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-3 shadow-lg">
                    Author
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pl-3 hover:bg-gray-200">
  <span className="sr-only">Edit</span>
</th>
                </tr>
              </thead>
              <tbody className="divide-y-reverse divide-neutral-300 text-center shadow-lg rounded-2xl">
                {currentItems.map((person) => (
                  <tr key={person.email}>
                    <td className="border-b border-r border-neutral-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-800 sm:pl-1">
                      {person.name}
                    </td>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.File}</td>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Size}</td>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Date}</td>
                    <td className="border-b border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Author}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="flex justify-center items-center px-2 py-2 bg-blue-200 rounded-2xl shadow-sm max-w-[34px]">
                        <img loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63f735ff26bf480c98745a2d021fc51e7054990b0a65b37e254a60b5d38c7fd?apiKey=285d536833cc4168a8fbec258311d77b&"
                        className="w-full aspect-[3.85]"/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-3">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-blue-200 text-blue-500' : 'bg-white text-blue-500'}`}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export { SearchButton, SearchInput, Table };
