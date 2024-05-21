import React, { useState } from 'react';
import PopupContent from '../Reusable/ProfileFilesPopup';


const data = [
  { name: 'Briefing', File: 'PDF', Size: '12', Date: '12.10.2023' , Author: 'by Musa' },
  { name: 'Report', File: 'Doc', Size: '7.4', Date: '07.10.2023' , Author: 'by Musa' },
  { name: 'Statistics for the Report', File: 'XLSX', Size: '3', Date: '24.09.2023' , Author: 'by Musa' },
  { name: 'Data on the Report', File: 'XLSX', Size: '2.5', Date: '22.09.2023' , Author: 'by Musa' },
  { name: 'User Guide', File: 'PDF', Size: '12.4', Date: '12.10.2023', Author: 'by Alex' },
  { name: 'System Overview', File: 'Doc', Size: '7.8', Date: '07.10.2023', Author: 'by Jamie' },
  { name: 'Error Logs', File: 'TXT', Size: '3.1', Date: '24.09.2023', Author: 'by Casey' },
  { name: 'Backup Data', File: 'ZIP', Size: '250', Date: '22.09.2023', Author: 'by Taylor' },
  { name: 'Configuration Settings', File: 'XML', Size: '1.5', Date: '15.09.2023', Author: 'by Jordan' },
  { name: 'Database Schema', File: 'SQL', Size: '8.2', Date: '10.09.2023', Author: 'by Morgan' },
  { name: 'License Agreement', File: 'PDF', Size: '0.9', Date: '05.09.2023', Author: 'by Riley' },
  { name: 'User Permissions', File: 'CSV', Size: '0.6', Date: '01.09.2023', Author: 'by Quinn' },
  { name: 'Security Audit', File: 'DOC', Size: '5.4', Date: '28.08.2023', Author: 'by Avery' },
  { name: 'Patch Notes', File: 'PDF', Size: '2.2', Date: '20.08.2023', Author: 'by Sam' },
  { name: 'Performance Report', File: 'XLSX', Size: '3.7', Date: '15.08.2023', Author: 'by Cameron' },
  { name: 'Change Log', File: 'TXT', Size: '1.0', Date: '10.08.2023', Author: 'by Skyler' },
  { name: 'Deployment Guide', File: 'PDF', Size: '14.3', Date: '05.08.2023', Author: 'by Dakota' },
  { name: 'Server Configuration', File: 'YAML', Size: '0.8', Date: '01.08.2023', Author: 'by Devon' },
  { name: 'Incident Report', File: 'DOC', Size: '4.0', Date: '28.07.2023', Author: 'by Casey' },
  { name: 'API Documentation', File: 'HTML', Size: '6.7', Date: '20.07.2023', Author: 'by Alex' },
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

const FileTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  // maybe can make in phone view just has list of the items only
  return (
    <div className="ml-8 w-full px-4 sm:px-6 lg:px-0 overflow-visible">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8 overflow-visible">
          <div className="bg-white-200 w-full h-[675px] px-8 py-8 rounded-2xl shadow-2xl overflow-visible">
            <table className="w-full rounded-2xl bg-white table-fixed overflow-visible">
              <thead>
                <tr>
                  <th scope="col" className="w-1/3 md:w-1/5 lg:w-1/3 rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-lg">Name</th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-2xl bg-blue-200 px-3.5 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">
                    <div className="flex justify-center">
                      <img src="assets/File.svg" alt="File" className="File" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">Size</th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">
                    <div className="flex justify-center">
                      <img src="assets/FileTableCalendar.svg" alt="Date" className="Date" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/8 md:w-1/10 lg:w-1/10 rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-lg">
                    <div className="flex justify-center">
                      <img src="assets/Author.svg" alt="Author" className="Author" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/12 relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody className="divide-y-reverse divide-neutral-500 text-center rounded-2xl">
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 sm:pl-1 overflow-hidden text-ellipsis">
                      {item.name}
                    </td>
                    <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">{item.File}</td>
                    <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">{item.Size}</td>
                    <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">{item.Date}</td>
                    <td className="border-b border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                      {item.Author}
                    </td>
                    <td className="flex relative mt-3.5"><PopupContent /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} paginate={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileTable;
