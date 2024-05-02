import React from 'react';
import Header from '../Components/DashboardHeader';
import Sidebar from '../Components/SideNavBar';

const Layout = ({ children }) => {
  return (
    <div className="flex-row">
      <Header />
      <div className="">
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
