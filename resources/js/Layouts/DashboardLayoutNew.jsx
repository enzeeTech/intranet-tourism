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




const Example = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-20">
        <Header setSidebarOpen={setSidebarOpen} />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default Example;
