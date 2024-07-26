import React, { useState, useEffect } from 'react';
import PopupContent from '../Reusable/PopupContent';
import Pagination from '../Paginator';
import { useCsrf } from "@/composables";

const excludedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'];

const FileTable = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const csrfToken = useCsrf();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/resources/resources');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const responseData = await response.json();

        if (!Array.isArray(responseData.data?.data)) {
          console.error('Expected an array of files, but received:', responseData.data?.data);
          setLoading(false);
          return;
        }

        const filesData = responseData.data.data.map(file => ({
          ...file,
          uploader: file.uploader, // Assuming the API provides an 'uploader' field with the uploader's name
          metadata: typeof file.metadata === 'string' ? JSON.parse(file.metadata) : file.metadata
        }));

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

  // Filter files based on search term and exclude media files
  const filteredFiles = files.filter(file => {
    const metadata = file.metadata || {};
    const fileExtension = metadata.extension ? metadata.extension.toLowerCase() : '';
    const fileName = metadata.original_name ? metadata.original_name.toLowerCase() : '';

    // Check if file extension is in the excluded list
    const isExcluded = excludedExtensions.includes(fileExtension);

    // Return true if not excluded and if name matches search term
    return !isExcluded && fileName.includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);

  const handleRename = (index, newName) => {
    const updatedFiles = files.map((file, i) => {
      if (i === index) {
        const metadata = file.metadata || {};
        metadata.name = newName;
        return { ...file, metadata: JSON.stringify(metadata) };
      }
      return file;
    });
    setFiles(updatedFiles);
  };

  const handleDelete = async (fileId, index) => {
    const url = `http://127.0.0.1:8000/api/crud/resources/${fileId}`;
    const options = {
      method: 'DELETE',
      headers: { Accept: "application/json", "X-CSRF-Token": csrfToken },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('Delete response:', data);

      // Remove the file from the state only if the deletion was successful
      if (response.ok) {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        window.location.reload();
      } else {
        console.error('Failed to delete file:', data);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
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
                  <th className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Uploaded By</th>
                  <th className="w-1/6 md:w-1/10 lg:w-1/10 rounded-full bg-blue-200 px-3 py-3.5 text-center text-sm font-semibold text-blue-500 shadow-custom">Date Created</th>
                  <th className="w-1/12 relative py-3.5 pl-3 pr-4 sm:pl-3"><span className="sr-only">Edit</span></th>
                </tr>
              </thead>
              <tbody className="divide-y-reverse divide-neutral-300 text-center rounded-full">
                {currentItems.map((item, index) => {
                  const metadata = item.metadata || {};
                  return (
                    <tr key={index}>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 sm:pl-1 overflow-hidden text-ellipsis">
                        {metadata.original_name || 'Unknown'}
                      </td>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                        {item.uploader || 'Unknown'} {/* Display 'Unknown' if uploader is not provided */}
                      </td>
                      <td className="border-b border-r border-neutral-300 whitespace-nowrap px-3 py-4 text-sm text-neutral-800 overflow-hidden text-ellipsis">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="flex relative mt-3.5">
                        <PopupContent
                          name={metadata.original_name || 'Unknown'}
                          file={item} // Pass the current file directly
                          onRename={(newName) => handleRename(indexOfFirstItem + index, newName)}
                          onDelete={() => handleDelete(item.id, indexOfFirstItem + index)} // Pass file ID and index
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination totalItems={filteredFiles.length} itemsPerPage={itemsPerPage} paginate={setCurrentPage} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileTable;
