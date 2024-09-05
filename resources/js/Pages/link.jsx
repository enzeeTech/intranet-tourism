import React, { useState, useEffect } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';

const API_URL = "/api/settings/external_links";

const Link = () => {
  const [links, setLinks] = useState([]);
  
  // Fetch data for links
  const fetchData = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch links");
      }
      const data = await response.json();
      setLinks(data.data.data); // Assuming this is the structure
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNavigationToLinks = () => {
    window.location.href = route('manage-links');
  };

  const handleNavigationToFolders = () => {
    window.location.href = route('manage-folders');
  };

  return (
    <Example>
      <div className="flex flex-col gap-1 px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
        <div className="mb-1">
          <PageTitle title="Link" />
        </div>

        <div className="flex flex-row gap-8">
          <div className="w-1/2 p-4 border rounded-lg shadow-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <PageTitle title="System" />
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                onClick={handleNavigationToLinks}
              >
                Manage System
              </button>
            </div>

            <div className="grid grid-cols-2 px-3 gap-4">
              <div className="font-bold">App name</div>
              <div className="font-bold">URL</div>
            </div>

            <div className="grid grid-cols-2 gap-0 mt-2 px-3"> {/* Set gap-0 to remove gap */}
  {links.map((link) => (
    <React.Fragment key={link.id}>
      <div className="border-b border-gray-300 py-2">{link.label}</div>
      <div className="border-b border-gray-300 py-2 px-2">{link.url}</div>
    </React.Fragment>
  ))}
</div>

          </div>

          {/* Folders Section */}
          <div className="w-1/2 p-4 border rounded-lg shadow-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <PageTitle title="Official File" />
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                onClick={handleNavigationToFolders}
              >
                Manage File
              </button>
            </div>

            <div className="grid grid-cols-2 px-3 gap-4">
              <div className="font-bold">Folder Name</div>
              <div className="font-bold">Department Name</div>
            </div>

            <div className="grid grid-cols-2 gap-0 mt-2 px-3">
              {/* Example rows for folder data */}
              <div className="border-b border-gray-300 py-2">Folder 1</div>
              <div className="border-b border-gray-300 py-2 px-2">Department 1</div>
              <div className="border-b border-gray-300 py-2">Folder 2</div>
              <div className="border-b border-gray-300 py-2 px-2">Department 2</div>
            </div>
          </div>
        </div>
      </div>
    </Example>
  );
};

export default Link;
