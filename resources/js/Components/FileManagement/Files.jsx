import React, { useState } from 'react';
import PopupContent from '../Reusable/ProfileFilesPopup';


const data = [
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

  return (
    <div className="ml-8 w-3/4 px-4 sm:px-6 lg:px-0">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <table className="min-w-full rounded-2xl bg-white">
            <thead>
              <tr>
                <th scope="col" className="rounded-2xl bg-blue-200 py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-lg">Name</th>
                <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">                    
                <div className="flex justify-center">
                  <img src="assets/File.svg" alt="File" className="File" />
                </div></th>
                <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">Size</th>
                <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">                    
                <div className="flex justify-center">
                  <img src="assets/FileTableCalendar.svg" alt="File" className="File" />
                </div></th>
                <th scope="col" className="rounded-2xl bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-lg">                    
                <div className="flex justify-center">
                  <img src="assets/Author.svg" alt="File" className="File" />
                </div></th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
              </tr>
            </thead>
            <tbody className="divide-y-reverse divide-neutral-500 text-center shadow-lg rounded-2xl">
              {currentItems.map((person, index) => (
                <tr key={index}>
                  <td className="border-b border-r border-neutral-500 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-800 sm:pl-1">{person.name}</td>
                  <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.File}</td>
                  <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Size}</td>
                  <td className="border-b border-r border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Date}</td>
                  <td className="border-b border-neutral-500 whitespace-nowrap px-3 py-4 text-sm text-neutral-800">{person.Author}</td>
                  <td className="flex relative mt-3.5"><PopupContent /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination totalItems={data.length} itemsPerPage={itemsPerPage} paginate={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}

export default FileTable;
