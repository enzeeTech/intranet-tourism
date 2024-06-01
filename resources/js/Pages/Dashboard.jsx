import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvent from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import Layout from '../Layouts/DashboardLayout';
import { Stories, Birthday, CreateStory } from '@/Components/Dashboard';
import { ShareYourThoughts } from '@/Components/Reusable/WallPosting';
import { Filter } from '@/Components/Reusable/WallPosting';
import { OutputData } from '@/Components/Reusable/WallPosting';

const Dashboard = () => {

  return (
    <Layout >
      <div className="staff-directory" style={{marginLeft: '10px'}} >
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
              <section className="flex flex-col pb-5 ml-16 rounded-none max-md:max-w-full" style={{backgroundColor: '#F3F4F6'}}>
                <Stories />
                {/* <CreateStory /> */}
                {/* <Birthday /> */}
                {/* <div className="featured-events-container"> */}
                <ShareYourThoughts />
                <Filter />
                {/* </div> */}
                <div className="mb-20"></div>
                <OutputData />
              </section>
            </div>
            <div className="flex flex-col mt-2.5 max-md:mt-10 max-md:max-w-full"></div>
          </main>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
