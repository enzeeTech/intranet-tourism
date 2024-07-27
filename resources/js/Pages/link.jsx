import React from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import Example from '@/Layouts/DashboardLayoutNew';
import Pautan from '@/Components/Settings/LinkComponent';

const Settings = () => {
  const handleNavigation = () => {
    window.location.href = '../settings';
  };

  return (
    <Example>
      <main className="">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 ">
          <div>
            <div className="flex  items-center justify-between mb-4">
              <PageTitle title="Pautan" />
              <button 
                className="px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-700 rounded-full"
                onClick={handleNavigation}
              >
                Manage Links
              </button>
            </div>
            <hr className="file-directory-underline" />
            <Pautan />
          </div>
        </div>
      </main>
    </Example>
  );
};

export default Settings;
