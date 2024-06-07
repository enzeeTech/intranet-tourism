import React from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import './css/StaffDirectory.css';
import Example from '../Layouts/DashboardLayoutNew';
import { Stories, Birthday, CreateStory } from '@/Components/Dashboard';
import { ShareYourThoughts } from '@/Components/Reusable/WallPosting';
import { Filter } from '@/Components/Reusable/WallPosting';
import { OutputData } from '@/Components/Reusable/WallPosting';
import MyComponent from '@/Components/Reusable/CommunitySide';

const Dashboard = () => {
  return (
    <Example>
      <main className="xl:pl-72 xl:pr-96">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col items-center">
          <Stories />
          <ShareYourThoughts />
          <Filter />
          <div className="mb-20"></div>
          <OutputData />
        </div>
      </main>

      <aside className="fixed bottom-0 left-20 top-16 hidden w-96 overflow-y-scroll border-r border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div className="file-directory-header">
          <PageTitle title="My Wall" />
        </div>
        <hr className="file-directory-underline" />
        <div>
          <FeaturedEvents />
          <WhosOnline />
        </div>
      </aside>

      <aside className="fixed bottom-0 right-20 top-16 hidden w-96 overflow-y-scroll border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <div>
          <MyComponent />
        </div>
      </aside>
    </Example>
  );
};

export default Dashboard;
