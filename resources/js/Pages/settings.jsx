import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import SettingNavigation from '@/Components/Settings/SettingsComponent';
import Example from '@/Layouts/DashboardLayoutNew';



const Settings = () => {


  return (
    <Example>
    <main className="xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
            {/* <SearchFile />
            <FileTable /> */}
            </div>
        </div>
    </main>
    <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="Settings" />
        </div>
        <hr className="file-directory-underline" />

        <div>
          <SettingNavigation />
        </div>
    </aside>
    </Example>
  );
};

export default Settings;
