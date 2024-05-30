import React from 'react';
import Header from '../Components/DashboardHeaderNew';
import Sidebar from '../Components/SideNavBarNew';
import { useState } from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import SearchFile from '../Components/Reusable/FileManagementSearchBar';
import { FileTable } from '@/Components/FileManagement';

import '../Components/Reusable/css/FileManagementSearchBar.css';
import Layout from '@/Layouts/DashboardLayoutNew';




export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-20">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
          <div className="right-widget">
            <SearchFile />
            <FileTable />
          </div>
          </div>
        </main>
      </div>
      <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-auto border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */          
        <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>}
      </aside>
    </div>
  )
}
