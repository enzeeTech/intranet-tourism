import React, { useState } from 'react';
import UserFilePopup from '../Reusable/UserFilePopup';

const SearchInput = () => (
  <div className="flex min-w-72 gap-2 px-5 py-1.5 text-md bg-white rounded-full border border-solid border-neutral-200 text-neutral-800 text-opacity-50 mt-8">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9a74adec558c689d2c2036311d5dad5a1cc1d44aea0cf5f88c1bd1bafeea3ce?apiKey=285d536833cc4168a8fbec258311d77b&"
      alt="Search Icon"
      className="shrink-0 w-6 aspect-square"
    />
    <input
      type="text"
      className="w-full py-2 pr-4 text-black border-none focus:outline-none"
      placeholder="Search"
    />
  </div>
);

const SearchButton = () => (
  <button className="justify-center px-5 py-1.5 my-auto text-sm font-bold text-center text-white bg-blue-500 rounded-3xl mt-10">
    Search
  </button>
);

const data = [
  { name: 'Briefing.pdf', Size: '12', Date: '12.10.2023', Author: 'by Musa' },
  { name: 'Report.doc', Size: '7.4', Date: '07.10.2023', Author: 'by Musa' },
  { name: 'Statistics for the Report.xlsx', Size: '3', Date: '24.09.2023', Author: 'by Musa' },
  { name: 'Data on the Report.xlsx', Size: '2.5', Date: '22.09.2023', Author: 'by Musa' },
  { name: 'User Guide.pdf', Size: '12.4', Date: '12.10.2023', Author: 'by Alex' },
  { name: 'System Overview.doc', Size: '7.8', Date: '07.10.2023', Author: 'by Jamie' },
  { name: 'Error Logs.txt', Size: '3.1', Date: '24.09.2023', Author: 'by Casey' },
  { name: 'Backup Data.zip', Size: '250', Date: '22.09.2023', Author: 'by Taylor' },
  { name: 'Configuration Settings.xml', Size: '1.5', Date: '15.09.2023', Author: 'by Jordan' },
  { name: 'Database Schema.sql', Size: '8.2', Date: '10.09.2023', Author: 'by Morgan' },
  { name: 'License Agreement.pdf', Size: '0.9', Date: '05.09.2023', Author: 'by Riley' },
  { name: 'User Permissions.csv', Size: '0.6', Date: '01.09.2023', Author: 'by Quinn' },
  { name: 'Security Audit.doc', Size: '5.4', Date: '28.08.2023', Author: 'by Avery' },
  { name: 'Patch Notes.pdf', Size: '2.2', Date: '20.08.2023', Author: 'by Sam' },
  { name: 'Performance Report.xlsx', Size: '3.7', Date: '15.08.2023', Author: 'by Cameron' },
  { name: 'Change Log.txt', Size: '1.0', Date: '10.08.2023', Author: 'by Skyler' },
  { name: 'Deployment Guide.pdf', Size: '14.3', Date: '05.08.2023', Author: 'by Dakota' },
  { name: 'Server Configuration.yaml', File: 'YAML', Size: '0.8', Date: '01.08.2023', Author: 'by Devon' },
  { name: 'Incident Report.doc', Size: '4.0', Date: '28.07.2023', Author: 'by Casey' },
  { name: 'API Documentation.html', Size: '6.7', Date: '20.07.2023', Author: 'by Alex' },
];

const Pagination = ({ totalItems, itemsPerPage, paginate, currentPage }) => (
  <div className="py-3">
    {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => (
      <button
        key={i}
        onClick={() => paginate(i + 1)}
        className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i + 1 ? 'bg-blue-200 text-blue-500' : 'bg-white text-blue-500'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [files, setFiles] = useState(data);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  return (
    <div className="w-full px-4 sm:px-0 lg:px-0 overflow-visible">
      <div className="mt-8 flow-root">
        <div className="overflow-visible">
          <div className="bg-white-200 w-full h-[715px] px-8 py-8 rounded-2xl shadow-custom overflow-visible">
            <table className="w-full rounded-2xl bg-white table-fixed overflow-visible border-separate border-spacing-1">
              <thead>
                <tr>
                  <th scope="col" className="w-1/3 md:w-1/5 lg:w-1/3 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-custom">Name</th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">(MB)</th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">
                    <div className="flex justify-center">
                      <img src="assets/FileTableCalendar.svg" alt="Date" className="Date" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-custom">
                    <div className="flex justify-center">
                      <img src="assets/Author.svg" alt="Author" className="Author" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/12 relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody className="divide-y-reverse divide-neutral-300 text-center rounded-full">
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 sm:pl-1 overflow-hidden text-ellipsis">
                      {item.name}
                    </td>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">{item.Size}</td>
                    <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">{item.Date}</td>
                    <td className="border-b border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                      {item.Author}
                    </td>
                    <td className="flex relative mt-3.5">
                      <UserFilePopup
                        name={item.name}
                        onDelete={() => handleDelete(indexOfFirstItem + index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination totalItems={files.length} itemsPerPage={itemsPerPage} paginate={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { SearchButton, SearchInput, Table };
