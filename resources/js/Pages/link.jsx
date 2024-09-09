import React from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import Pautan from '@/Components/Settings/LinkComponent';

const Settings = () => {
  const handleLinkNavigation = () => {
    window.location.href = route('manage-links');
  };

  const handleFolderNavigation = () => {
    window.location.href = route('manage-folders');
  };

  return (
    <Example>
      <div className="flex flex-col w-full min-h-screen bg-gray-100">
        {/* Main Title inside the gray background */}
        <div className="px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
          <h1 className="text-4xl font-bold text-gray-900">Link</h1>
        </div>

        <div className="flex flex-row w-full">
          {/* Left section for Department Links */}
          <div className="flex flex-col w-1/2 p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-4">
              <PageTitle title="System" />
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                onClick={handleLinkNavigation}
              >
                Manage system
              </button>
            </div>
            {/* Display only department links */}
            <Pautan displayType="non-department" />
          </div>

          {/* Right section for Non-Department Links */}
          <div className="flex flex-col w-1/2 p-4 sm:p-6 lg:p-8 border-l border-gray-300">
            <div className="flex items-center justify-between mb-4">
              <PageTitle title="Official File" />
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                onClick={handleFolderNavigation}
              >
                Manage File
              </button>
            </div>
            {/* Display only non-department links */}
            <Pautan displayType="department" />
          </div>
        </div>
      </div>
    </Example>
  );
};

export default Settings;
