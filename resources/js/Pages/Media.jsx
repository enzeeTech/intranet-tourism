import React, {useState} from 'react';
import PageTitle from '../Components/Reusable/PageTitle';
import FeaturedEvents from '../Components/Reusable/FeaturedEventsWidget/FeaturedEvents';
import WhosOnline from '../Components/Reusable/WhosOnlineWidget/WhosOnline';
import { Image } from '@/Components/Reusable/Media';
import './css/StaffDirectory.css';




const Media = () => {


  return (
    <div className="file-directory">
      <div>
        <div className="file-directory-header">
          <PageTitle title="Files" />
        </div>
        <hr className="file-directory-underline" />
        <div className="widgets-container">
          <div className="left-widget">
            <FeaturedEvents />
            <WhosOnline />
          </div>
          <div className="right-widget">
            <Image />
          </div>

        </div>
      </div>
    </div>
  );
};
  
export default Media;
