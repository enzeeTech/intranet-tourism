import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupContent from '../Reusable/PopupContent';

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
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/api/crud/resources',
      headers: {Accept: 'application/json'}
    };
    // Function to fetch file details from the server
    const fetchFiles = async () => {
      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const handleRename = (index, newName) => {
    const updatedFiles = files.map((file, i) => {
      if (i === index) {
        return { ...file, name: newName };
      }
      return file;
    });
    setFiles(updatedFiles);
  };

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
                  <th scope="col" className="w-1/3 md:w-1/2 lg:w-2/4 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-custom">Name</th>
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">(MB)</th>
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">
                    <div className="flex justify-center">
                      <img src="assets/FileTableCalendar.svg" alt="Date" className="Date" />
                    </div>
                  </th>
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Author</th>
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
                      <PopupContent
                        name={item.name}
                        onRename={(newName) => handleRename(indexOfFirstItem + index, newName)}
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

export default FileTable;
