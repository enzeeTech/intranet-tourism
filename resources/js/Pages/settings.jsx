import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
// import SettingNavigation from '@/Components/Settings/SettingsComponent';
import Example from '@/Layouts/DashboardLayoutNew';
import ReactDOM from 'react-dom';
import SettingsPage from '@/Components/Settings/SettingsPage';
import SettingNavigation from '@/Components/Settings/SettingsComponent';





const Settings = () => {


  return (
    <Example>
    <main className="xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
          <PageTitle title="Settings" />

          <SettingsPage />

            </div>
        </div>
    </main>
    {/* <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
        </div>
        <hr className="file-directory-underline" />

        <div>

        </div>
    </aside> */}
    </Example>
  );
};

export default Settings;
