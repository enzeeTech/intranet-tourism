import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { Image } from '@/Components/Reusable/Media';
import { Video } from '@/Components/Reusable/Media';
import Layout from '../Layouts/DashboardLayout';
import './css/StaffDirectory.css';




const Media = () => {


  return (
    <Layout>
    <div className="staff-directory bg-slate-200">
      <div>
        <div className="staff-directory-header">
          <PageTitle title="Media" />
        </div>
        <hr className="staff-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>
          <div className="right-widget">
            <Image />
            <div className='mt-16'></div>
            <Video />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};
  
export default Media;
