import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchFile from '../Components/Reusable/FileManagementSearchBar';
import { FileTable } from '@/Components/FileManagement';
import './css/StaffDirectory.css';
import '../Components/Reusable/css/FileManagementSearchBar.css';
import Example from '@/Layouts/DashboardLayoutNew';



const Settings = () => {


  return (
    <Example>
    <main className="xl:pl-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <div>
            <SearchFile />
            <FileTable />
            </div>
        </div>
    </main>
    <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="File" />
        </div>
        <hr className="file-directory-underline" />

        <div>
            <FeaturedEvents />
            <WhosOnline />
        </div>
    </aside>
    </Example>
  );
};

export default Settings;
