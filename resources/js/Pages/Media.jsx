import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { Image } from '@/Components/Reusable/Media';
import { Video } from '@/Components/Reusable/Media';
import Example from '../Layouts/DashboardLayoutNew';
import './css/StaffDirectory.css';
import '../Components/Reusable/css/FileManagementSearchBar.css'




const Media = () => {


  return (
    <Example>
    <div className="file-director">
        <div className="file-directory-header">
          <PageTitle title="Media" />
        </div>
        <hr className="file-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>
          <div className="right-widget -mt-20">
            <Image />
            <div className='mt-16'></div>
            <Video />
          </div>
        </div>
    </div>
    </Example>
  );
};

export default Media;
