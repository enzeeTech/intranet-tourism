import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvent from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import Layout from '../Layouts/DashboardLayout';
import { Stories, Birthday } from '@/Components/Dashboard';

const Dashboard = () => {

  return (
    <Layout>
      <div className="staff-directory">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <aside className="flex flex-col w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-5 mt-20 grow max-md:mt-10">
              <div className="staff-directory-header">
                <PageTitle title="My Wall" />
              </div>
                <hr className="staff-directory-underline" />
              <div className="widgets-container">
                <div className="left-widget">
                  <FeaturedEvent />
                  <WhosOnline />
                </div>
              </div>
            </div>
          </aside>
          <main className="flex flex-col ml-5 w-[73%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-2.5 max-md:mt-10 max-md:max-w-full">
              <section className="flex flex-col pb-5 bg-white rounded-none shadow-sm max-md:max-w-full ml-16">
                <Stories />
                {/* <Birthday /> */}
              </section>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
