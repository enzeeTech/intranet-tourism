import React, { useState, useEffect } from 'react';
// import axios from 'axios';
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

// const Table = (userId) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const options = {
//       method: 'GET',
//       headers: { Accept: 'application/json' }
//     };
  
//     const fetchFiles = async () => {
//       try {
//         const response = await fetch('/api/crud/resources', options);
//         if (!response.ok) {
//           throw new Error('Failed to fetch files');
//         }
//         const responseData = await response.json();
//         const filesData = responseData.data.data; // Adjust this path based on the actual structure
  
//         setFiles(filesData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching files:', error);
//         setLoading(false);
//       }
//     };
  
//     fetchFiles();
//   }, []);


const Table = ({ userId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`/api/crud/resources`);
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const responseData = await response.json();
        const filesData = responseData.data.data;

        // Filter the files based on the document types and userId
        const documentFiles = filesData.filter(file => {
          const ext = file.extension.toLowerCase();
          return (
            ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(ext) &&
            file.user_id === userId
          );
        });

        setFiles(documentFiles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = files.slice(indexOfFirstItem, indexOfLastItem);

  const handleRename = (index, newName) => {
    const updatedFiles = files.map((file, i) => {
      if (i === index) {
        const metadata = JSON.parse(file.metadata);
        metadata.name = newName;
        return { ...file, metadata: JSON.stringify(metadata) };
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
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Size (MB)</th>
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Extension</th>
                  <th scope="col" className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Date Created</th>
                  <th scope="col" className="w-1/12 relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody className="divide-y-reverse divide-neutral-300 text-center rounded-full">
                {currentItems.map((item, index) => {
                  const metadata = JSON.parse(item.metadata);
                  return (
                    <tr key={index}>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 sm:pl-1 overflow-hidden text-ellipsis">
                        {metadata.name}
                      </td>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                        {(item.filesize / 1024 / 1024).toFixed(2)} MB
                      </td>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                        {item.extension}
                      </td>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="flex relative mt-3.5">
                        <UserFilePopup
                          name={metadata.name}
                          onRename={(newName) => handleRename(indexOfFirstItem + index, newName)}
                          onDelete={() => handleDelete(indexOfFirstItem + index)}
                        />
                      </td>
                    </tr>
                  );
                })}
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
