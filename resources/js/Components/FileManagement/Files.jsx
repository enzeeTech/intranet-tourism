import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PopupContent from '../Reusable/PopupContent';
import { data } from 'autoprefixer';

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchFiles = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/crud/resources');
          const responseData = response.data;

          // Check if responseData.data.data is an array
          if (!Array.isArray(responseData.data.data)) {
            console.error('Expected an array of files, but received:', responseData.data.data);
            setLoading(false);
            return;
          }

          const filesData = responseData.data.data;

          // Filter the files based on their extensions
        //   const documentFiles = filesData.filter(file => {
        //     const fileExtension = file.extension.toLowerCase();
        //     return [].includes(fileExtension);
        //   });

          setFiles(filesData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching files:', error);
          setLoading(false);
        }
      };

      fetchFiles();
    }, []);

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
            <div className="w-full h-[715px] px-8 py-8 rounded-2xl shadow-custom overflow-visible bg-white">
              <table className="w-full rounded-2xl bg-white table-fixed border-separate border-spacing-1">
                <thead>
                  <tr>
                    <th className="w-1/3 md:w-1/2 lg:w-2/4 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 sm:pl-1 shadow-custom">Name</th>
                    <th className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Size (MB)</th>
                    <th className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Extension</th>
                    <th className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Date Created</th>
                    <th className="w-1/12 relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y-reverse divide-neutral-300 text-center rounded-full">
                  {currentItems.map((item, index) => {
                    const metadata = JSON.parse(item.metadata);
                    const fileExtension = item.extension.toLowerCase(); // Ensure item.extension exists
                    return (
                      <tr key={index}>
                        <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 sm:pl-1 overflow-hidden text-ellipsis">
                          {metadata.name}
                        </td>
                        <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                          {(item.filesize / 1024 / 1024).toFixed(2)} MB
                        </td>
                        <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                          {fileExtension}
                        </td>
                        <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                          {new Date(item.created_at).toLocaleDateString()}
                        </td>
                        <td className="flex relative mt-3.5">
                          <PopupContent
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

  export default FileTable;
